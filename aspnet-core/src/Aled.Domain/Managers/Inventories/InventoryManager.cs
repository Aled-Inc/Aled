using System;
using System.Threading.Tasks;
using Aled.AggregateRoots.Inventories;
using Aled.Entities.Products;
using Aled.Products.Dtos;
using Aled.Repositories.Inventories;
using Aled.Services.Inventories;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.Users;

namespace Aled.Managers.Inventories;

public class InventoryManager : DomainService, IInventoryManager
{
    private readonly ICurrentUser _currentUser;
    private readonly IInventoryRepository _efCoreInventoryRepository;
    private readonly IBasicRepository<Inventory, Guid> _inventoryRepository;
    private readonly IBasicRepository<Product, Guid> _productRepository;

    public InventoryManager(
        IBasicRepository<Inventory, Guid> inventoryRepository,
        IBasicRepository<Product, Guid> productRepository, IInventoryRepository efCoreInventoryRepository,
        ICurrentUser currentUser)
    {
        _inventoryRepository = inventoryRepository;
        _productRepository = productRepository;
        _efCoreInventoryRepository = efCoreInventoryRepository;
        _currentUser = currentUser;
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

    public async Task<Inventory> AddProductAsync(Product product)
    {
        var inventory = await GetInventoryWithFullDetailsAsync();

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

        inventory.RemoveProduct(removeProductDto.Id);

        // Remove the product separately
        await _productRepository.DeleteAsync(removeProductDto.Id);

        // Update the inventory
        await _inventoryRepository.UpdateAsync(inventory, true);

        return inventory;
    }

    private async Task<Inventory> GetInventoryWithFullDetailsAsync()
    {
        return await _efCoreInventoryRepository.GetInventoryWithFullDetailsAsync(_currentUser.GetId());
    }
}