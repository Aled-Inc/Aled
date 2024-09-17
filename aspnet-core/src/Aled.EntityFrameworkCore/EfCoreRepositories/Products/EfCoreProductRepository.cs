using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Aled.Entities.Products;
using Aled.EntityFrameworkCore;
using Aled.Products;
using Aled.Repositories.Products;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace Aled.EfCoreRepositories.Products;

public class EfCoreProductRepository: EfCoreRepository<AledDbContext, Product, Guid>, IProductRepository
{
    public EfCoreProductRepository(IDbContextProvider<AledDbContext> dbContextProvider) : base(dbContextProvider)
    {
        
    }
    
    public async Task<List<Product>> GetInventoryProductsAsync(
        Guid userId,
        string? sorting = null,
        int maxResultCount = int.MaxValue,
        int skipCount = 0,
        string? filter = null,
        CancellationToken cancellationToken = default)
    {
        var ctx = await GetDbSetAsync();
        var query = ctx.AsQueryable();

        var filterOnTag = int.TryParse(filter, out var tagFilterValue);
        
        if (filterOnTag && Enum.IsDefined(typeof(ProductCategoryTagsEnum), tagFilterValue))
        {
            query = query.Where(x => x.ProductCategoryTag == (ProductCategoryTagsEnum) tagFilterValue);
        }
        else if (!filter.IsNullOrWhiteSpace())
        {
            query = query.Where(x => x.ProductName.Contains(filter) || x.Brands.Contains(filter));
        }

        return await query
            .OrderBy(sorting.IsNullOrWhiteSpace() ? nameof(Product.ProductName) : sorting)
            .PageBy(skipCount, maxResultCount)
            .ToListAsync(GetCancellationToken(cancellationToken));
    }

    public async Task<long> GetCountAsync(string? filter, CancellationToken cancellationToken = default)
    {
        var ctx = await GetDbSetAsync();

        return await ctx
            .WhereIf(!filter.IsNullOrWhiteSpace(),
                x => x.ProductName.Contains(filter) ||
                     x.Brands.Contains(filter))
            .LongCountAsync(GetCancellationToken(cancellationToken));
    }
}