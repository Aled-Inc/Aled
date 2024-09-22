using System;
using System.Threading.Tasks;
using Aled.AggregateRoots.Inventories;
using Aled.EntityFrameworkCore;
using Aled.Repositories.Inventories;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace Aled.EfCoreRepositories.Inventories;

public class EfCoreInventoryRepository : EfCoreRepository<AledDbContext, Inventory, Guid>, IInventoryRepository
{
    public EfCoreInventoryRepository(IDbContextProvider<AledDbContext> dbContextProvider) : base(dbContextProvider)
    {
    }

    public async Task<Inventory> GetInventoryWithFullDetailsAsync(Guid userId)
    {
        var ctx = await GetDbSetAsync();

        return await ctx
            .Include(inventory => inventory.Products)
            .FirstAsync(inventory => inventory.UserId == userId);
    }
    
    
}