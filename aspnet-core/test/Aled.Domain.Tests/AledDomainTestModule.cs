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
        
        context.Services.AddScoped(typeof(IIdentityRoleRepository), typeof(InMemoryIdentityRoleRepository));
        context.Services.AddScoped(typeof(IIdentityUserRepository), typeof(InMemoryIdentityUserRepository));
        context.Services.AddScoped(typeof(IOrganizationUnitRepository), typeof(InMemoryOrganizationUnitRepository));
        context.Services.AddScoped(typeof(IIdentityLinkUserRepository), typeof(InMemoryIdentityLinkUserRepository));
        context.Services.AddScoped(typeof(ISettingDefinitionRecordRepository), typeof(InMemorySettingDefinitionRecordRepository));
        context.Services.AddScoped(typeof(IIdentitySecurityLogRepository), typeof(InMemoryIdentitySecurityLogRepository));
        context.Services.AddScoped(typeof(IBackgroundJobRepository), typeof(InMemoryBackgroundJobRepository));
        context.Services.AddScoped(typeof(ITenantRepository), typeof(InMemoryTenantRepository));
        context.Services.AddScoped(typeof(IPermissionGroupDefinitionRecordRepository), typeof(InMemoryPermissionGroupDefinitionRecordRepository));
        context.Services.AddScoped(typeof(IPermissionDefinitionRecordRepository), typeof(InMemoryPermissionDefinitionRecordRepository));
        context.Services.AddScoped(typeof(IInventoryRepository), typeof(InMemoryInventoryBasicRepository));
        context.Services.AddScoped(typeof(IProductRepository), typeof(InMemoryProductRepository));
    }
}