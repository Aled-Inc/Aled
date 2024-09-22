using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Identity;

namespace Aled.Fakes.Repositories;

public class InMemoryIdentityLinkUserRepository : InMemoryBasicRepository<IdentityLinkUser, Guid>, IIdentityLinkUserRepository
{
    public Task<IdentityLinkUser> FindAsync(IdentityLinkUserInfo sourceLinkUserInfo, IdentityLinkUserInfo targetLinkUserInfo,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<List<IdentityLinkUser>> GetListAsync(IdentityLinkUserInfo linkUserInfo, List<IdentityLinkUserInfo> excludes = null,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public async Task DeleteAsync(IdentityLinkUserInfo linkUserInfo, CancellationToken cancellationToken = new CancellationToken())
    {
        var entity = await FindAsync(_ =>
            _.SourceTenantId == linkUserInfo.UserId && _.SourceTenantId == linkUserInfo.TenantId ||
            _.TargetUserId == linkUserInfo.UserId && _.TargetTenantId == linkUserInfo.TenantId);

        await DeleteAsync(entity, false, cancellationToken);
    }
}