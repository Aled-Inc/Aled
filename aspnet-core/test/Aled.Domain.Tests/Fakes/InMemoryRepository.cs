using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Linq;

namespace Aled.Fakes;

public class InMemoryRepository<TEntity, TKey> : 
    InMemoryBasicRepository<TEntity, TKey>,
    IRepository<TEntity, TKey> 
    where TEntity : class, IEntity<TKey>
{
    public InMemoryRepository(IAsyncQueryableExecuter asyncExecuter)
    {
        AsyncExecuter = asyncExecuter;
    }

    public IQueryable<TEntity> WithDetails()
    {
        throw new NotImplementedException();
    }

    public IQueryable<TEntity> WithDetails(params Expression<Func<TEntity, object>>[] propertySelectors)
    {
        throw new NotImplementedException();
    }

    public Task<IQueryable<TEntity>> WithDetailsAsync()
    {
        throw new NotImplementedException();
    }

    public Task<IQueryable<TEntity>> WithDetailsAsync(params Expression<Func<TEntity, object>>[] propertySelectors)
    {
        throw new NotImplementedException();
    }

    public async Task<IQueryable<TEntity>> GetQueryableAsync()
    {
        return await Task.FromResult(_entities.AsQueryable());
    }

    public Task<List<TEntity>> GetListAsync(Expression<Func<TEntity, bool>> predicate, bool includeDetails = false,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public IAsyncQueryableExecuter AsyncExecuter { get; }

    public async Task<TEntity?> FindAsync(Expression<Func<TEntity, bool>> predicate, bool includeDetails = true,
        CancellationToken cancellationToken = new CancellationToken())
    {
        return await FindAsync(func: predicate);
    }

    public Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> predicate, bool includeDetails = true,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task DeleteAsync(Expression<Func<TEntity, bool>> predicate, bool autoSave = false,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task DeleteDirectAsync(Expression<Func<TEntity, bool>> predicate, CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }
}