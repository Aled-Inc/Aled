﻿using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Account;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Http.Client;
using Volo.Abp.Http.Client.IdentityModel;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;
using Volo.Abp.VirtualFileSystem;

namespace Aled;

[DependsOn(
    typeof(AbpHttpClientModule),
    typeof(AledApplicationContractsModule),
    typeof(AbpAccountHttpApiClientModule),
    typeof(AbpPermissionManagementHttpApiClientModule),
    typeof(AbpTenantManagementHttpApiClientModule),
    typeof(AbpFeatureManagementHttpApiClientModule),
    typeof(AbpSettingManagementHttpApiClientModule),
    typeof(AbpHttpClientIdentityModelModule)
)]
public class AledHttpApiClientModule : AbpModule
{
    public const string RemoteServiceName = "AledOpenFoodFactService";

    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        context.Services.AddStaticHttpClientProxies(typeof(AledHttpApiClientModule).Assembly, RemoteServiceName);

        Configure<AbpVirtualFileSystemOptions>(options => { options.FileSets.AddEmbedded<AledHttpApiClientModule>(); });
    }
}