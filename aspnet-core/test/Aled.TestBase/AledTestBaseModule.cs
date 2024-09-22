using Aled.Security;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Volo.Abp;
using Volo.Abp.Authorization;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Modularity;
using Volo.Abp.Users;

namespace Aled;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(AbpTestBaseModule),
    typeof(AbpAuthorizationModule),
    typeof(AbpBackgroundJobsAbstractionsModule)
)]
public class AledTestBaseModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpBackgroundJobOptions>(options => { options.IsJobExecutionEnabled = false; });
        
        context.Services.AddScoped<ICurrentUser, FakeCurrentUser>();
    }

    // public override void OnApplicationInitialization(ApplicationInitializationContext context)
    // {
    //     SeedTestData(context);
    // }

    // private static void SeedTestData(ApplicationInitializationContext context)
    // {
    //     AsyncHelper.RunSync(async () =>
    //     {
    //         using (var scope = context.ServiceProvider.CreateScope())
    //         {
    //             await scope.ServiceProvider
    //                 .GetRequiredService<IDataSeeder>()
    //                 .SeedAsync();
    //         }
    //     });
    // }
}