using System;
using System.Threading.Tasks;
using Aled.AggregateRoots.Inventories;
using Aled.Entities.Products;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Entities.Events;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.EventBus;
using Volo.Abp.Identity;

namespace Aled.Events.Identity;

public class LocalIdentityUserChangeEventHandler : ILocalEventHandler<EntityCreatedEventData<IdentityUser>>,
    ILocalEventHandler<EntityDeletedEventData<IdentityUser>>,
    ITransientDependency
{
    private readonly IIdentityUserRepository _identityUserRepository;
    private readonly IRepository<Inventory, Guid> _inventoryRepository;
    private readonly IRepository<Product, Guid> _productRepository;

    public LocalIdentityUserChangeEventHandler(IIdentityUserRepository identityUserRepository,
        IRepository<Inventory, Guid> inventoryRepository, IRepository<Product, Guid> productRepository)
    {
        _identityUserRepository = identityUserRepository;
        _inventoryRepository = inventoryRepository;
        _productRepository = productRepository;
    }

    public async Task HandleEventAsync(EntityCreatedEventData<IdentityUser> eventData)
    {
        var inventory = await _inventoryRepository.InsertAsync(new Inventory(eventData.Entity), true);
        var user = await _identityUserRepository.GetAsync(eventData.Entity.Id);

        user.SetProperty("InventoryId", inventory.Id);
        await _identityUserRepository.UpdateAsync(user);
    }

    public async Task HandleEventAsync(EntityDeletedEventData<IdentityUser> eventData)
    {
        await _inventoryRepository.DeleteAsync(i => i.UserId == eventData.Entity.Id, true);
        await _productRepository.DeleteAsync(p =>
            p.InventoryId == eventData.Entity.GetProperty("InventoryId", Guid.Empty));
    }
}