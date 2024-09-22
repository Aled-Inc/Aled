using Aled.Fakes;
using Aled.Fakes.Repositories;
using Aled.Repositories.Inventories;
using Aled.Repositories.Products;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Identity;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;

namespace Aled;

[DependsOn(
    typeof(AledDomainModule),
    typeof(AledTestBaseModule)
)]
public class AledDomainTestModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        base.ConfigureServices(context);
        
        context.Services.AddScoped(typeof(IBasicRepository<,>), typeof(InMemoryBasicRepository<,>));
        context.Services.AddScoped(typeof(IRepository<,>), typeof(InMemoryRepository<,>));
        
        context.Services.AddScoped(typeof(IIdentityRoleRepository), typeof(IdentityRoleBasicRepositoryFake));
        context.Services.AddScoped(typeof(IIdentityUserRepository), typeof(IdentityUserBasicRepositoryFake));
        context.Services.AddScoped(typeof(IOrganizationUnitRepository), typeof(OrganizationUnitBasicRepositoryFake));
        context.Services.AddScoped(typeof(IIdentityLinkUserRepository), typeof(IdentityLinkUserBasicRepositoryFake));
        context.Services.AddScoped(typeof(ISettingDefinitionRecordRepository), typeof(SettingDefinitionRecordBasicRepositoryFake));
        context.Services.AddScoped(typeof(IIdentitySecurityLogRepository), typeof(IdentitySecurityLogBasicRepositoryFake));
        context.Services.AddScoped(typeof(IBackgroundJobRepository), typeof(BackgroundJobBasicRepositoryFake));
        context.Services.AddScoped(typeof(ITenantRepository), typeof(TenantBasicRepositoryFake));
        context.Services.AddScoped(typeof(IPermissionGroupDefinitionRecordRepository), typeof(PermissionGroupDefinitionRecordBasicRepositoryFake));
        context.Services.AddScoped(typeof(IPermissionDefinitionRecordRepository), typeof(PermissionDefinitionRecordBasicRepositoryFake));
        context.Services.AddScoped(typeof(IInventoryRepository), typeof(InventoryBasicRepositoryFake));
        context.Services.AddScoped(typeof(IProductRepository), typeof(InMemoryProductRepository));
    }
}