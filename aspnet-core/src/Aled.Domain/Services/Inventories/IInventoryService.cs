using System.Threading.Tasks;
using Aled.AggregateRoots.Inventories;
using Volo.Abp.Domain.Services;

namespace Aled.Services.Inventories;

public interface IInventoryService : IDomainService
{
    Task<Inventory> GetAsync();
    Task<Inventory> ClearAsync();
}