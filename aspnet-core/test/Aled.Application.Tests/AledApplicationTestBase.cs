using Volo.Abp.Modularity;

namespace Aled;

public abstract class AledApplicationTestBase<TStartupModule> : AledTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{
}