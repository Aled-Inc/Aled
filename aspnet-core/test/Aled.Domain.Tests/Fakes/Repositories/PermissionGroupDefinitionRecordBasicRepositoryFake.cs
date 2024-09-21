using System;
using Volo.Abp.PermissionManagement;

namespace Aled.Fakes.Repositories;

public class PermissionGroupDefinitionRecordBasicRepositoryFake : InMemoryBasicRepository<PermissionGroupDefinitionRecord, Guid>, IPermissionGroupDefinitionRecordRepository
{
}