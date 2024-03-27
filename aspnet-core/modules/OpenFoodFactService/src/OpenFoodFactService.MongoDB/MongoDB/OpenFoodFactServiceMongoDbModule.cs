using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Modularity;
using Volo.Abp.MongoDB;

namespace OpenFoodFactService.MongoDB;

[DependsOn(
    typeof(OpenFoodFactServiceDomainModule),
    typeof(AbpMongoDbModule)
    )]
public class OpenFoodFactServiceMongoDbModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        context.Services.AddMongoDbContext<OpenFoodFactServiceMongoDbContext>(options =>
        {
                /* Add custom repositories here. Example:
                 * options.AddRepository<Question, MongoQuestionRepository>();
                 */
        });
    }
}
