using Aled.Fakes;
using Aled.Fakes.Managers;
using Aled.Fakes.Services;
using Aled.OpenFoodFactService.Products;
using Aled.Services;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using Volo.Abp.Authorization;
using Volo.Abp.Identity;
using Volo.Abp.Modularity;
using Volo.Abp.Uow;

namespace Aled;

[DependsOn(
    typeof(AledApplicationModule),
    typeof(AledDomainTestModule)
)]
public class AledApplicationTestModule : AbpModule
{
    public override void PreConfigureServices(ServiceConfigurationContext context)
    {
        PreConfigure<IdentityBuilder>(builder => { builder.AddDefaultTokenProviders(); });
    }
    
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        base.ConfigureServices(context);

        context.Services.AddDistributedMemoryCache();

        InjectManagers(context);
        InjectProviders(context);

        context.Services.AddScoped<IProductAppService, ProductProxyAppServiceFake>();
    }
    
    private static void InjectProviders(ServiceConfigurationContext context)
    {
        context.Services.AddScoped<IDataProtectionProvider, EphemeralDataProtectionProvider>();
    }

    private static void InjectManagers(ServiceConfigurationContext context)
    {
        context.Services.AddScoped(typeof(IdentityUserManager), typeof(IdentityUserManagerFake));
        context.Services.AddScoped(typeof(IdentitySecurityLogManager), typeof(IdentitySecurityLogManagerFake));
        
        context.Services.AddScoped(typeof(IUnitOfWorkManager), typeof(UnitOfWorkManagerFake));
        context.Services.AddTransient<Mock<IUnitOfWork>>(_ => new Mock<IUnitOfWork>());
        context.Services.AddTransient<Mock<IdentityUserManager>>(_ => new Mock<IdentityUserManager>());
    }
}