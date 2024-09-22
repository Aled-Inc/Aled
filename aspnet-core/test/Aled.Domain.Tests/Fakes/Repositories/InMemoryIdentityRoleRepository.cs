using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Identity;

namespace Aled.Fakes.Repositories;

public class InMemoryIdentityRoleRepository : InMemoryBasicRepository<IdentityRole, Guid>, IIdentityRoleRepository
{
    public Task<IdentityRole> FindByNormalizedNameAsync(string normalizedRoleName, bool includeDetails = true,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<List<IdentityRoleWithUserCount>> GetListWithUserCountAsync(string sorting = null, int maxResultCount = 2147483647, int skipCount = 0,
        string filter = null, bool includeDetails = false, CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<List<IdentityRole>> GetListAsync(string sorting = null, int maxResultCount = 2147483647, int skipCount = 0, string filter = null,
        bool includeDetails = false, CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<List<IdentityRole>> GetListAsync(IEnumerable<Guid> ids, CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<List<IdentityRole>> GetDefaultOnesAsync(bool includeDetails = false, CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<long> GetCountAsync(string filter = null, CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }
}