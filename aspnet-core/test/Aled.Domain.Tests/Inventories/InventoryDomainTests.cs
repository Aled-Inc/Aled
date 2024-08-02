using System;
using System.Threading.Tasks;
using Aled.Services.Inventories;
using Shouldly;
using Volo.Abp.Identity;
using Volo.Abp.Modularity;
using Xunit;

namespace Aled.Inventories;

public abstract class InventoryDomainTests<TStartupModule> : AledDomainTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{
    private readonly IInventoryManager _inventoryManager;

    protected InventoryDomainTests()
    {
        _inventoryManager = base.GetRequiredService<IInventoryManager>();
    }

    [Fact]
    public async Task ShouldGetInventory()
    {
        // Arrange
        // A new user is already created with fake claims so we dont need to arrange this part.

        // Action
        var inventory = await _inventoryManager.GetAsync();

        // Assert
        inventory.ShouldNotBeNull();
    }
}