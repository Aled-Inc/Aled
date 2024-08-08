using System;
using System.Threading.Tasks;
using Aled.AggregateRoots.Inventories;
using Aled.OpenFoodFactService.Products.Dtos;
using Aled.Products.Dtos;

namespace Aled.Managers.Inventories;

public interface IInventoryManager
{
    Task<Inventory> GetAsync();
    Task<Inventory> ClearAsync();
    Task<Inventory> AddProductAsync(GetProductDto product, DateTime expirationDate);
    Task<Inventory> RemoveProductAsync(RemoveProductDto removeProductDto);
}