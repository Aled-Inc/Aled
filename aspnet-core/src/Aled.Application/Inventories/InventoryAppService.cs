using System.Threading.Tasks;
using Aled.AggregateRoots.Inventories;
using Aled.Entities.Products;
using Aled.Inventories.Dtos;
using Aled.Products.Dtos;
using Aled.Services.Inventories;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp.Application.Services;

namespace Aled.Inventories;

[Authorize]
public class InventoryAppService : ApplicationService, IInventoryAppService
{
    private readonly IInventoryManager _inventoryManager;

    public InventoryAppService(IInventoryManager inventoryManager)
    {
        _inventoryManager = inventoryManager;
    }

    public async Task<InventoryDto> GetAsync()
    {
        var inventory = await _inventoryManager.GetAsync();
        
        return ObjectMapper.Map<Inventory, InventoryDto>(inventory);
    }

    public async Task<InventoryDto> ClearAsync()
    {
        var inventory = await _inventoryManager.ClearAsync();

        return ObjectMapper.Map<Inventory, InventoryDto>(inventory);
    }

    public async Task<InventoryDto> AddProductAsync(AddProductDto addProductDto)
    {
        var product = ObjectMapper.Map<AddProductDto, Product>(addProductDto);

        var inventory = await _inventoryManager.AddProductAsync(product);

        return ObjectMapper.Map<Inventory, InventoryDto>(inventory);
    }

    public async Task<InventoryDto> RemoveProductAsync(RemoveProductDto removeProductDto)
    {
        var inventory = await _inventoryManager.RemoveProductAsync(removeProductDto);

        return ObjectMapper.Map<Inventory, InventoryDto>(inventory);
    }
}