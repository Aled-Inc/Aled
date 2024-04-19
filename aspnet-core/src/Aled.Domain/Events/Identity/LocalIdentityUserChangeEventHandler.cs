using System.Threading.Tasks;
using Aled.AggregateRoots.Inventories;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Entities.Events;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.EventBus;
using Volo.Abp.Identity;

namespace Aled.Events.Identity;

public class LocalIdentityUserChangeEventHandler(IRepository<Inventory> inventoryRepository)
    : ILocalEventHandler<EntityCreatedEventData<IdentityUser>>,
        ILocalEventHandler<EntityDeletedEventData<IdentityUser>>,
        ITransientDependency
{
    public async Task HandleEventAsync(EntityCreatedEventData<IdentityUser> eventData)
    {
        await inventoryRepository.InsertAsync(new Inventory
        {
            UserId = eventData.Entity.Id,
            CreationTime = eventData.Entity.CreationTime
        }, true);
    }

    public async Task HandleEventAsync(EntityDeletedEventData<IdentityUser> eventData)
    {
        await inventoryRepository.DeleteAsync(i => i.UserId == eventData.Entity.Id, true);
    }
}