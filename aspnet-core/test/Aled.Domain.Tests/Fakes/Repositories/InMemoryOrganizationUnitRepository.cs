using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Identity;

namespace Aled.Fakes.Repositories;

public class InMemoryOrganizationUnitRepository : InMemoryBasicRepository<OrganizationUnit, Guid>, IOrganizationUnitRepository
{
    public Task<List<OrganizationUnit>> GetChildrenAsync(Guid? parentId, bool includeDetails = false,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<List<OrganizationUnit>> GetAllChildrenWithParentCodeAsync(string code, Guid? parentId, bool includeDetails = false,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<OrganizationUnit> GetAsync(string displayName, bool includeDetails = true,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<List<OrganizationUnit>> GetListAsync(string sorting = null, int maxResultCount = 2147483647, int skipCount = 0,
        bool includeDetails = false, CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<List<OrganizationUnit>> GetListAsync(IEnumerable<Guid> ids, bool includeDetails = false,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<List<OrganizationUnit>> GetListByRoleIdAsync(Guid roleId, bool includeDetails = false,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<List<IdentityRole>> GetRolesAsync(OrganizationUnit organizationUnit, string sorting = null, int maxResultCount = 2147483647,
        int skipCount = 0, bool includeDetails = false, CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<List<IdentityRole>> GetRolesAsync(Guid[] organizationUnitIds, string sorting = null, int maxResultCount = 2147483647,
        int skipCount = 0, bool includeDetails = false, CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<int> GetRolesCountAsync(OrganizationUnit organizationUnit,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<List<IdentityRole>> GetUnaddedRolesAsync(OrganizationUnit organizationUnit, string sorting = null, int maxResultCount = 2147483647,
        int skipCount = 0, string filter = null, bool includeDetails = false,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<int> GetUnaddedRolesCountAsync(OrganizationUnit organizationUnit, string filter = null,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<List<IdentityUser>> GetMembersAsync(OrganizationUnit organizationUnit, string sorting = null, int maxResultCount = 2147483647,
        int skipCount = 0, string filter = null, bool includeDetails = false,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<List<Guid>> GetMemberIdsAsync(Guid id, CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<int> GetMembersCountAsync(OrganizationUnit organizationUnit, string filter = null,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<List<IdentityUser>> GetUnaddedUsersAsync(OrganizationUnit organizationUnit, string sorting = null, int maxResultCount = 2147483647,
        int skipCount = 0, string filter = null, bool includeDetails = false,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task<int> GetUnaddedUsersCountAsync(OrganizationUnit organizationUnit, string filter = null,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task RemoveAllRolesAsync(OrganizationUnit organizationUnit,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }

    public Task RemoveAllMembersAsync(OrganizationUnit organizationUnit,
        CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }
}