using Volo.Abp.Modularity;

namespace Aled;

[DependsOn(
    typeof(AledDomainModule),
    typeof(AledTestBaseModule)
)]
public class AledDomainTestModule : AbpModule
{
}