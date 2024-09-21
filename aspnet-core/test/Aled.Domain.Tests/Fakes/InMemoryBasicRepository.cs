using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories;

namespace Aled.Fakes;

public class InMemoryBasicRepository<TEntity, TKey> : IBasicRepository<TEntity, TKey>
    where TEntity : class, IEntity<TKey>
{
    protected ImmutableList<TEntity> _entities;

    public InMemoryBasicRepository() => _entities = new List<TEntity>().ToImmutableList();


    public bool? IsChangeTrackingEnabled { get; }
    
    public async Task<List<TEntity>> GetListAsync(bool includeDetails = false, CancellationToken cancellationToken = new CancellationToken())
    {
        return await Task.FromResult(_entities.ToList()).ConfigureAwait(false);
    }

    public async Task<long> GetCountAsync(CancellationToken cancellationToken = new CancellationToken())
    {
        return await Task.FromResult((long)_entities.Count).ConfigureAwait(false);
    }

    public async Task<List<TEntity>> GetPagedListAsync(int skipCount, int maxResultCount, string sorting, bool includeDetails = false,
        CancellationToken cancellationToken = new CancellationToken())
    {
        return await Task.FromResult(_entities.Skip(skipCount).Take(maxResultCount).OrderBy(_ => sorting).ToList()).ConfigureAwait(false);
    }

    public async Task<TEntity> InsertAsync(TEntity entity, bool autoSave = false, CancellationToken cancellationToken = new CancellationToken())
    {
        _entities = new List<TEntity>(_entities.Add(entity)).ToImmutableList();
        
        return await Task.FromResult(entity).ConfigureAwait(false);
    }

    public async Task InsertManyAsync(IEnumerable<TEntity> entities, bool autoSave = false,
        CancellationToken cancellationToken = new CancellationToken())
    {
        TEntity[] addRangeAsync = entities as TEntity[] ?? entities.ToArray();

        foreach (TEntity entity in addRangeAsync)
        {
            await InsertAsync(entity, cancellationToken: cancellationToken);
        }
    }

    public Task<TEntity> UpdateAsync(TEntity entity, bool autoSave = false, CancellationToken cancellationToken = new CancellationToken())
    {
        TEntity entityToUpdate = _entities.Single(e => e.Id?.ToString() == entity.Id?.ToString());
        
        _entities = new List<TEntity>(_entities.Remove(entityToUpdate)).ToImmutableList();
        _entities = new List<TEntity>(_entities.Add(entityToUpdate)).ToImmutableList();

        return Task.FromResult(entity);
    }

    public async Task UpdateManyAsync(IEnumerable<TEntity> entities, bool autoSave = false,
        CancellationToken cancellationToken = new CancellationToken())
    {
        TEntity[] updateRangeAsync = entities as TEntity[] ?? entities.ToArray();

        foreach (TEntity entity in updateRangeAsync)
        {
            await UpdateAsync(entity, cancellationToken: cancellationToken);
        }
    }

    public Task DeleteAsync(TEntity entity, bool autoSave = false, CancellationToken cancellationToken = new CancellationToken())
    {
        TEntity entityToRemove = _entities.Single(e => e.Id?.ToString() == entity.Id?.ToString());
        
        _entities = new List<TEntity>(_entities.Remove(entityToRemove)).ToImmutableList();

        return Task.FromResult(0);
    }

    public async Task DeleteManyAsync(IEnumerable<TEntity> entities, bool autoSave = false,
        CancellationToken cancellationToken = new CancellationToken())
    {
        TEntity[] deleteRangeAsync = entities as TEntity[] ?? entities.ToArray();
        
        foreach (TEntity entity in deleteRangeAsync)
        {
            await DeleteAsync(entity, cancellationToken: cancellationToken);
        }
    }

    public async Task<TEntity> GetAsync(TKey id, bool includeDetails = true, CancellationToken cancellationToken = new CancellationToken())
    {
        return await Task.FromResult(_entities.Single(e => e.Id?.ToString() == id?.ToString())).ConfigureAwait(false);
    }

    public async Task<TEntity?> FindAsync(TKey id, bool includeDetails = true, CancellationToken cancellationToken = new CancellationToken())
    {
        return await Task.FromResult(_entities.Find(e => e.Id?.ToString() == id?.ToString())).ConfigureAwait(false);
    }

    protected async Task<TEntity?> FindAsync(Expression<Func<TEntity, bool>> func)
    {
        var entity = GenerateQuery(func).SingleOrDefault();
        return await Task.FromResult(entity).ConfigureAwait(false);
    }

    public Task DeleteAsync(TKey id, bool autoSave = false, CancellationToken cancellationToken = new CancellationToken())
    {
        TEntity entityToRemove = _entities.Single(e => e.Id?.ToString() == id?.ToString());
        
        _entities = new List<TEntity>(_entities.Remove(entityToRemove)).ToImmutableList();

        return Task.FromResult(0);
    }

    public async Task DeleteManyAsync(IEnumerable<TKey> ids, bool autoSave = false,
        CancellationToken cancellationToken = new CancellationToken())
    {
        TKey[] deleteRangeAsync = ids as TKey[] ?? ids.ToArray();
        
        foreach (TKey id in deleteRangeAsync)
        {
            await DeleteAsync(id, cancellationToken: cancellationToken);
        }
    }
    
    protected IQueryable<TEntity> GenerateQuery(Expression<Func<TEntity, bool>> func) =>
        _entities.AsQueryable().Where(func);
}