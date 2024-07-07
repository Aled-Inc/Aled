using System.Threading.Tasks;
using Aled.AggregateRoots.Inventories;
using Aled.Inventories.Dtos;
using Aled.OpenFoodFactService;
using Aled.Services.Inventories;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp.Identity;

namespace Aled.Inventories;

[Authorize]
public class InventoryAppService(IInventoryService inventoryService, IHealthCheckAppService healthCheckAppService) : AledAppService, IInventoryAppService
{
    public async Task<InventoryDto> GetAsync()
    {
        var inventory = await inventoryService.GetAsync();
        return ObjectMapper.Map<Inventory, InventoryDto>(inventory);
    }

    public async Task<InventoryDto> ClearAsync()
    {
        var inventory = await inventoryService.ClearAsync();

        return ObjectMapper.Map<Inventory, InventoryDto>(inventory);
    }
}