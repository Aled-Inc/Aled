using System;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.PermissionManagement;

namespace Aled.Fakes.Repositories;

public class InMemoryPermissionDefinitionRecordRepository : InMemoryBasicRepository<PermissionDefinitionRecord, Guid>, IPermissionDefinitionRecordRepository
{
    public Task<PermissionDefinitionRecord> FindByNameAsync(string name, CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }
}