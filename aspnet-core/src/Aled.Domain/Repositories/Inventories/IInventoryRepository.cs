using System;
using System.Threading.Tasks;
using Aled.AggregateRoots.Inventories;
using Volo.Abp.Domain.Repositories;

namespace Aled.Repositories.Inventories;

public interface IInventoryRepository : IRepository<Inventory, Guid>
{
    Task<Inventory> GetInventoryWithFullDetailsAsync(Guid userId);
}