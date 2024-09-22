using System;
using Volo.Abp.PermissionManagement;

namespace Aled.Fakes.Repositories;

public class InMemoryPermissionGroupDefinitionRecordRepository : InMemoryBasicRepository<PermissionGroupDefinitionRecord, Guid>, IPermissionGroupDefinitionRecordRepository
{
}