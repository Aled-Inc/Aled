using System.Threading.Tasks;
using Aled.Inventories.Dtos;
using Volo.Abp.Application.Services;

namespace Aled.Inventories;

public interface IInventoryAppService : IApplicationService
{
    Task<InventoryDto> GetAsync();
    Task<InventoryDto> ClearAsync();
}