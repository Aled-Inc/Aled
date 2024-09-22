using System.Threading.Tasks;
using Aled.Inventories.Dtos;
using Aled.Products.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Aled.Inventories;

public interface IInventoryAppService : IApplicationService
{
    Task<InventoryDto> GetAsync();
    Task<InventoryDto> ClearAsync();
    Task<ProductDto> AddProductAsync(ProductScannedDto addProductDto);
    Task<InventoryDto> RemoveProductAsync(RemoveProductDto removeProductDto);
    Task<PagedResultDto<ProductDto>> GetProductsAsync(GetProductsDto getProductsDto);
}