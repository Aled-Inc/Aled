using System.Threading.Tasks;
using Aled.AggregateRoots.Inventories;
using Aled.Entities.Products;
using Aled.Products.Dtos;
using Volo.Abp.Domain.Services;

namespace Aled.Services.Inventories;

public interface IInventoryManager : IDomainService
{
    Task<Inventory> GetAsync();
    Task<Inventory> ClearAsync();
    Task<Inventory> AddProductAsync(Product product);
    Task<Inventory> RemoveProductAsync(RemoveProductDto removeProductDto);
}