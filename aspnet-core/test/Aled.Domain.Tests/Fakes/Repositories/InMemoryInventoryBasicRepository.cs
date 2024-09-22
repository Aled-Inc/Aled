using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using Aled.AggregateRoots.Inventories;
using Aled.Repositories.Inventories;
using Volo.Abp.Linq;

namespace Aled.Fakes.Repositories;

public class InMemoryInventoryBasicRepository : InMemoryBasicRepository<Inventory, Guid>, IInventoryRepository
{
    public IQueryable<Inventory> WithDetails()
    {
        throw new NotImplementedException();
    }

    public IQueryable<Inventory> WithDetails(params Expression<Func<Inventory, object>>[] propertySelectors)
    {
        throw new NotImplementedException();
    }

    public Task<IQueryable<Inventory>> WithDetailsAsync()
    {
        throw new NotImplementedException();
    }

    public Task<IQueryable<Inventory>> WithDetailsAsync(params Expression<Func<Inventory, object>>[] propertySelectors)
    {
        throw new NotImplementedException();
    }

    public Task<IQueryable<Inventory>> GetQueryableAsync()
    {
        throw new NotImplementedException();
    }

    public Task<List<Inventory>> GetListAsync(Expression<Func<Inventory, bool>> predicate, bool includeDetails = false,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public IAsyncQueryableExecuter AsyncExecuter { get; }

    public async Task<Inventory?> FindAsync(Expression<Func<Inventory, bool>> predicate, bool includeDetails = true,
        CancellationToken cancellationToken = new CancellationToken())
    {
        var entity = GenerateQuery(predicate).SingleOrDefault();
        return await Task.FromResult(entity).ConfigureAwait(false);
    }

    public async Task<Inventory> GetAsync(Expression<Func<Inventory, bool>> predicate, bool includeDetails = true,
        CancellationToken cancellationToken = new CancellationToken())
    {
        return (await FindAsync(predicate, includeDetails, cancellationToken))!;
    }

    public Task DeleteAsync(Expression<Func<Inventory, bool>> predicate, bool autoSave = false,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task DeleteDirectAsync(Expression<Func<Inventory, bool>> predicate, CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public async Task<Inventory> GetInventoryWithFullDetailsAsync(Guid userId)
    {
        return await Task.FromResult(_entities.Single(i => i.UserId == userId));
    }
}