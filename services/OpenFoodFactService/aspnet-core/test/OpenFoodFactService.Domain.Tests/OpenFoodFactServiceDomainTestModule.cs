using Volo.Abp.Modularity;

namespace OpenFoodFactService;

[DependsOn(
    typeof(OpenFoodFactServiceDomainModule),
    typeof(OpenFoodFactServiceTestBaseModule)
)]
public class OpenFoodFactServiceDomainTestModule : AbpModule
{

}
