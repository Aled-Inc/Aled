using System;
using System.Threading.Tasks;
using Aled.AggregateRoots.Inventories;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Users;

namespace Aled.Services.Inventories;

public class InventoryService(IRepository<Inventory> inventoryRepository, ICurrentUser currentUser) : IInventoryService
{
    public async Task<Inventory> GetAsync()
    {
        var inventory = await inventoryRepository.FindAsync(x => x.UserId == currentUser.Id);

        return inventory!;
    }

    public Task<Inventory> ClearAsync()
    {
        throw new NotImplementedException();
    }
}