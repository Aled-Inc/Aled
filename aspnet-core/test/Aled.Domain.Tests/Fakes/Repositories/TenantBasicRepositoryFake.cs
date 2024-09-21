using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.TenantManagement;

namespace Aled.Fakes.Repositories;

public class TenantBasicRepositoryFake : InMemoryBasicRepository<Tenant, Guid>, ITenantRepository
{
    public Task<Tenant> FindByNameAsync(string normalizedName, bool includeDetails = true,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Tenant FindByName(string normalizedName, bool includeDetails = true)
    {
        throw new NotImplementedException();
    }

    public Tenant FindById(Guid id, bool includeDetails = true)
    {
        throw new NotImplementedException();
    }

    public Task<List<Tenant>> GetListAsync(string sorting = null, int maxResultCount = 2147483647, int skipCount = 0, string filter = null,
        bool includeDetails = false, CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<long> GetCountAsync(string filter = null, CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }
}