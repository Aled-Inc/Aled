using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Aled.Entities.Products;
using Aled.Products;
using Aled.Repositories.Products;
using Volo.Abp.Linq;

namespace Aled.Fakes.Repositories;

public class InMemoryProductRepository : InMemoryRepository<Product, Guid>, IProductRepository
{
    public InMemoryProductRepository(IAsyncQueryableExecuter asyncExecuter) : base(asyncExecuter)
    {
    }

    public async Task<List<Product>> GetInventoryProductsAsync(Guid userId, string? sorting = null, int maxResultCount = Int32.MaxValue,
        int skipCount = 0, string? filter = null, CancellationToken cancellationToken = default)
    {
        var query = _entities.AsQueryable().Where(p => p.Inventory.UserId == userId);
        
        var filterOnTag = int.TryParse(filter, out var tagFilterValue);
        
        if (filterOnTag && Enum.IsDefined(typeof(ProductCategoryTagsEnum), tagFilterValue))
        {
            query = query.Where(x => x.ProductCategoryTag == (ProductCategoryTagsEnum) tagFilterValue);
        }
        else if (!filter.IsNullOrWhiteSpace())
        {
            query = query.Where(x => x.ProductName.Contains(filter) || x.Brands.Contains(filter));
        }

        var result = query
            .OrderBy(q => sorting.IsNullOrWhiteSpace() ? nameof(Product.ProductName) : sorting)
            .PageBy(skipCount, maxResultCount)
            .ToList();

        return await Task.FromResult(result).ConfigureAwait(false);
    }

    public async Task<long> GetCountAsync(Guid userId, string? filter, CancellationToken cancellationToken = default)
    {
        var query = _entities.AsQueryable();
        var result = query.Where(p => p.Inventory.UserId == userId)
            .WhereIf(!filter.IsNullOrWhiteSpace(),
            x => x.ProductName.Contains(filter) ||
                 x.Brands.Contains(filter)).LongCount();
        
        return await Task.FromResult(result).ConfigureAwait(false);
    }
}