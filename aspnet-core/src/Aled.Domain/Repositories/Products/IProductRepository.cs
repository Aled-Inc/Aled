using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Aled.Entities.Products;
using Volo.Abp.Domain.Repositories;

namespace Aled.Repositories.Products;

public interface IProductRepository : IRepository<Product, Guid>
{
    Task<List<Product>> GetInventoryProductsAsync(
        Guid userId,
        string? sorting = null,
        int maxResultCount = int.MaxValue,
        int skipCount = 0,
        string? filter = null,
        CancellationToken cancellationToken = default);

    Task<long> GetCountAsync(string? filter, CancellationToken cancellationToken = default);
}