using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Aled.AggregateRoots.Inventories;
using Aled.Entities.Products;
using Aled.OpenFoodFactService.Products.Dtos;
using Aled.Products.Dtos;
using ProductDto = Aled.Products.Dtos.ProductDto;

namespace Aled.Managers.Inventories;

public interface IInventoryManager
{
    Task<Inventory> GetAsync();
    Task<Inventory> GetDetailsAsync();
    Task<Inventory> ClearAsync();
    Task<Product> AddProductAsync(GetProductDto product);
    Task<Inventory> RemoveProductAsync(RemoveProductDto removeProductDto);
    Task<List<Product>> GetListAsync(
        string? sorting = null,
        int maxResultCount = int.MaxValue,
        int skipCount = 0,
        string? filter = null,
        bool includeDetails = false,
        CancellationToken cancellationToken = default
    );
    Task<long> GetCountAsync(
        string? filter = null,
        CancellationToken cancellationToken = default
    );
}