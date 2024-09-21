using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Identity;

namespace Aled.Fakes.Repositories;

public class IdentityUserBasicRepositoryFake : InMemoryBasicRepository<IdentityUser, Guid>, IIdentityUserRepository
{
    public async Task<IdentityUser> FindByNormalizedUserNameAsync(string normalizedUserName, bool includeDetails = true,
        CancellationToken cancellationToken = new CancellationToken())
    {
        return (await FindAsync(u => u.NormalizedUserName == normalizedUserName))!;
    }

    public Task<List<string>> GetRoleNamesAsync(Guid id, CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<List<string>> GetRoleNamesInOrganizationUnitAsync(Guid id, CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<IdentityUser> FindByLoginAsync(string loginProvider, string providerKey, bool includeDetails = true,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public async Task<IdentityUser> FindByNormalizedEmailAsync(string normalizedEmail, bool includeDetails = true,
        CancellationToken cancellationToken = new CancellationToken())
    {
        return (await FindAsync(u => u.NormalizedEmail == normalizedEmail))!;
    }

    public Task<List<IdentityUser>> GetListByClaimAsync(Claim claim, bool includeDetails = false,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<List<IdentityUser>> GetListByNormalizedRoleNameAsync(string normalizedRoleName, bool includeDetails = false,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<List<Guid>> GetUserIdListByRoleIdAsync(Guid roleId, CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<List<IdentityUser>> GetListAsync(string sorting = null, int maxResultCount = 2147483647, int skipCount = 0, string filter = null,
        bool includeDetails = false, Guid? roleId = null, Guid? organizationUnitId = null, string userName = null,
        string phoneNumber = null, string emailAddress = null, string name = null, string surname = null,
        bool? isLockedOut = null, bool? notActive = null, bool? emailConfirmed = null, bool? isExternal = null,
        DateTime? maxCreationTime = null, DateTime? minCreationTime = null, DateTime? maxModifitionTime = null,
        DateTime? minModifitionTime = null, CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<List<IdentityRole>> GetRolesAsync(Guid id, bool includeDetails = false, CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<List<OrganizationUnit>> GetOrganizationUnitsAsync(Guid id, bool includeDetails = false,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<List<IdentityUser>> GetUsersInOrganizationUnitAsync(Guid organizationUnitId,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<List<IdentityUser>> GetUsersInOrganizationsListAsync(List<Guid> organizationUnitIds,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<List<IdentityUser>> GetUsersInOrganizationUnitWithChildrenAsync(string code,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<long> GetCountAsync(string filter = null, Guid? roleId = null, Guid? organizationUnitId = null, string userName = null,
        string phoneNumber = null, string emailAddress = null, string name = null, string surname = null,
        bool? isLockedOut = null, bool? notActive = null, bool? emailConfirmed = null, bool? isExternal = null,
        DateTime? maxCreationTime = null, DateTime? minCreationTime = null, DateTime? maxModifitionTime = null,
        DateTime? minModifitionTime = null, CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<IdentityUser> FindByTenantIdAndUserNameAsync(string userName, Guid? tenantId, bool includeDetails = true,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<List<IdentityUser>> GetListByIdsAsync(IEnumerable<Guid> ids, bool includeDetails = false,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task UpdateRoleAsync(Guid sourceRoleId, Guid? targetRoleId,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task UpdateOrganizationAsync(Guid sourceOrganizationId, Guid? targetOrganizationId,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<List<IdentityUserIdWithRoleNames>> GetRoleNamesAsync(IEnumerable<Guid> userIds, CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }
}