using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Aled.Entities.Products;
using Aled.EntityFrameworkCore;
using Aled.Repositories.Products;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace Aled.EfCoreRepositories.Products;

public class EfCoreProductsRepository: EfCoreRepository<AledDbContext, Product, Guid>, IProductRepository
{
    public EfCoreProductsRepository(IDbContextProvider<AledDbContext> dbContextProvider) : base(dbContextProvider)
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

        return await ctx
            .WhereIf(!filter.IsNullOrWhiteSpace(),
                x => x.ProductName.Contains(filter) ||
                     x.Brands.Contains(filter))
            .OrderBy(sorting.IsNullOrWhiteSpace() ? nameof(Product.AddedDate) : sorting)
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