using System;
using System.Threading.Tasks;
using Aled.AggregateRoots.Inventories;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Identity;

namespace Aled.DataSeeders;

public class InventoryDataSeedContributor : IDataSeedContributor, ITransientDependency
{
    private readonly IRepository<IdentityUser> _identityUserRepository;
    private readonly IRepository<Inventory, Guid> _inventoryRepository;

    public InventoryDataSeedContributor(IRepository<Inventory, Guid> inventoryRepository,
        IRepository<IdentityUser> identityUserRepository)
    {
        _inventoryRepository = inventoryRepository;
        _identityUserRepository = identityUserRepository;
    }

    public async Task SeedAsync(DataSeedContext context)
    {
        var user = await _identityUserRepository.InsertAsync(
            new IdentityUser(
                Guid.Parse("2e701e62-0953-4dd3-910b-dc6cc93ccb0d"),
                "admin",
                "admin@aled.com"));

        var inventory = new Inventory(user);

        await _inventoryRepository.InsertAsync(inventory, true);
    }
}