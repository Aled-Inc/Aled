using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.SettingManagement;

namespace Aled.Fakes.Repositories;

public class InMemorySettingDefinitionRecordRepository : InMemoryBasicRepository<SettingDefinitionRecord, Guid>, ISettingDefinitionRecordRepository
{
    public Task<SettingDefinitionRecord> FindByNameAsync(string name, CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }
}