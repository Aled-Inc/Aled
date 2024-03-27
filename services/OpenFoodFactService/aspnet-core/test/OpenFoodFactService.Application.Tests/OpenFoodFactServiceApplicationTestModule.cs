using Volo.Abp.Modularity;

namespace OpenFoodFactService;

[DependsOn(
    typeof(OpenFoodFactServiceApplicationModule),
    typeof(OpenFoodFactServiceDomainTestModule)
)]
public class OpenFoodFactServiceApplicationTestModule : AbpModule
{

}
