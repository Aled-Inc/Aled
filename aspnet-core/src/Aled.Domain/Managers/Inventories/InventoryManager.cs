using System;
using System.Threading.Tasks;
using Aled.AggregateRoots.Inventories;
using Aled.Entities.Products;
using Aled.OpenFoodFactService.Products;
using Aled.OpenFoodFactService.Products.Dtos;
using Aled.Products.Dtos;
using Aled.Repositories.Inventories;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.Users;
using IObjectMapper = Volo.Abp.ObjectMapping.IObjectMapper;
using ProductDto = Aled.OpenFoodFactService.Products.Dtos.ProductDto;

namespace Aled.Managers.Inventories;

public class InventoryManager : DomainService, IInventoryManager
{
    private readonly ICurrentUser _currentUser;
    private readonly IInventoryRepository _efCoreInventoryRepository;
    private readonly IRepository<Inventory, Guid> _inventoryRepository;
    private readonly IObjectMapper _objectMapper;
    private readonly IProductAppService _productAppService;
    private readonly IRepository<Product, Guid> _productRepository;

    public InventoryManager(
        IRepository<Inventory, Guid> inventoryRepository,
        IRepository<Product, Guid> productRepository, IInventoryRepository efCoreInventoryRepository,
        ICurrentUser currentUser, IProductAppService productAppService, IObjectMapper objectMapper)
    {
        _inventoryRepository = inventoryRepository;
        _productRepository = productRepository;
        _efCoreInventoryRepository = efCoreInventoryRepository;
        _currentUser = currentUser;
        _productAppService = productAppService;
        _objectMapper = objectMapper;
    }

    public async Task<Inventory> GetAsync()
    {
        return await GetInventoryWithFullDetailsAsync();
    }

    public async Task<Inventory> ClearAsync()
    {
        var inventory = await GetInventoryWithFullDetailsAsync();

        inventory.Products.Clear();

        await _inventoryRepository.UpdateAsync(inventory);

        return inventory;
    }

    public async Task<Inventory> AddProductAsync(GetProductDto getProductDto, DateTime expirationDate)
    {
        var inventory = await GetInventoryWithFullDetailsAsync();

        var productDto = await _productAppService.GetAsync(getProductDto);

        var product = _objectMapper.Map<ProductDto, Product>(productDto);

        product.ExpirationDate = expirationDate;

        inventory.AddProduct(product);

        // Save the product separately
        await _productRepository.InsertAsync(product);

        // Update the inventory
        await _inventoryRepository.UpdateAsync(inventory, true);

        return inventory;
    }

    public async Task<Inventory> RemoveProductAsync(RemoveProductDto removeProductDto)
    {
        var inventory = await GetInventoryWithFullDetailsAsync();

        inventory.RemoveProduct(Guid.Parse(removeProductDto.ProductId));

        // Remove the product separately
        await _productRepository.DeleteAsync(Guid.Parse(removeProductDto.ProductId));

        // Update the inventory
        await _inventoryRepository.UpdateAsync(inventory, true);

        return inventory;
    }

    private async Task<Inventory> GetInventoryWithFullDetailsAsync()
    {
        return await _efCoreInventoryRepository.GetInventoryWithFullDetailsAsync(_currentUser.GetId());
    }
}