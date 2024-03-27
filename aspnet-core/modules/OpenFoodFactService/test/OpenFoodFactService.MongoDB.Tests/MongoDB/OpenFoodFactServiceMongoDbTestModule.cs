using System;
using Volo.Abp.Data;
using Volo.Abp.Modularity;
using Volo.Abp.Uow;

namespace OpenFoodFactService.MongoDB;

[DependsOn(
    typeof(OpenFoodFactServiceApplicationTestModule),
    typeof(OpenFoodFactServiceMongoDbModule)
)]
public class OpenFoodFactServiceMongoDbTestModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpDbConnectionOptions>(options =>
        {
            options.ConnectionStrings.Default = MongoDbFixture.GetRandomConnectionString();
        });
    }
}
