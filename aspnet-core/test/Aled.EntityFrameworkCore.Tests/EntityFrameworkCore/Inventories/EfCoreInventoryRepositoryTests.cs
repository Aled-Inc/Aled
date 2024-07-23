using System;
using System.Threading.Tasks;
using Aled.Repositories.Inventories;
using Shouldly;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Identity;
using Xunit;

namespace Aled.EntityFrameworkCore.Inventories;

[Collection(AledTestConsts.CollectionDefinitionName)]
public class EfCoreInventoryRepositoryTests : AledEntityFrameworkCoreTestBase
{
    private readonly IInventoryRepository _inventoryRepository;
    private readonly IRepository<IdentityUser, Guid> _userRepository;

    public EfCoreInventoryRepositoryTests()
    {
        _inventoryRepository = base.GetRequiredService<IInventoryRepository>();
        _userRepository = base.GetRequiredService<IRepository<IdentityUser, Guid>>();
    }

    [Fact]
    public async Task Should_Get_Inventory_With_Full_Details()
    {
        // Arrange
        var user = await CreateUserAsync("testuse@example.com");

        // Act
        var inventory = await _inventoryRepository.GetInventoryWithFullDetailsAsync(user.Id);

        // Assert
        inventory.ShouldNotBeNull();
        inventory.Products.ShouldNotBeNull();
    }

    [Fact]
    public async Task Should_Throw_Exception_If_Inventory_Not_Found()
    {
        // Arrange
        var user = await CreateUserAsync("testuser@example.com");

        // Action
        await WithUnitOfWorkAsync(async () => await _userRepository.DeleteAsync(user.Id));

        // Assert
        await Assert.ThrowsAsync<InvalidOperationException>(() =>
            _inventoryRepository.GetInventoryWithFullDetailsAsync(user.Id));
    }

    private async Task<IdentityUser> CreateUserAsync(string email)
    {
        var user = new IdentityUser(Guid.NewGuid(), email, email);

        await WithUnitOfWorkAsync(async () => await _userRepository.InsertAsync(user));

        return user;
    }
}