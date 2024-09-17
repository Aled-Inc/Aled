using System.Collections.Generic;
using System.Threading.Tasks;
using Aled.AggregateRoots.Inventories;
using Aled.Entities.Products;
using Aled.Inventories.Dtos;
using Aled.Managers.Inventories;
using Aled.OpenFoodFactService.Products.Dtos;
using Aled.Products.Dtos;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using ProductDto = Aled.Products.Dtos.ProductDto;

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
    
    public async Task<InventoryDetailsDto> GetDetailsAsync()
    {
        var inventory = await _inventoryManager.GetAsync();

        return ObjectMapper.Map<Inventory, InventoryDetailsDto>(inventory);
    }

    public async Task<InventoryDto> ClearAsync()
    {
        var inventory = await _inventoryManager.ClearAsync();

        return ObjectMapper.Map<Inventory, InventoryDto>(inventory);
    }

    public async Task<ProductDto> AddProductAsync(ProductScannedDto productScannedDto)
    {
        var product = new GetProductDto
        {
            Code = productScannedDto.Code
        };

        var addedProduct = await _inventoryManager.AddProductAsync(product);

        return ObjectMapper.Map<Product, ProductDto>(addedProduct);
    }

    public async Task<InventoryDto> RemoveProductAsync(RemoveProductDto removeProductDto)
    {
        var inventory = await _inventoryManager.RemoveProductAsync(removeProductDto);

        return ObjectMapper.Map<Inventory, InventoryDto>(inventory);
    }

    public async Task<PagedResultDto<ProductDto>> GetProductsAsync(GetProductsDto getProductsDto)
    {
        var list = await _inventoryManager.GetListAsync(getProductsDto.Sorting, getProductsDto.MaxResultCount, getProductsDto.SkipCount, getProductsDto.Filter);
        var totalCount = await _inventoryManager.GetCountAsync(getProductsDto.Filter);
    
        return new PagedResultDto<ProductDto>(
            totalCount,
            ObjectMapper.Map<List<Product>, List<ProductDto>>(list));
    }
}