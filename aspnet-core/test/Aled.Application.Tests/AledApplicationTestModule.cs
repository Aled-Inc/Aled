using Volo.Abp.Modularity;

namespace Aled;

[DependsOn(
    typeof(AledApplicationModule),
    typeof(AledDomainTestModule)
)]
public class AledApplicationTestModule : AbpModule
{
}