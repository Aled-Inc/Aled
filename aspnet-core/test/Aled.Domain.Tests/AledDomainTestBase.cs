using Volo.Abp.Modularity;

namespace Aled;

/* Inherit from this class for your domain layer tests. */
public abstract class AledDomainTestBase<TStartupModule> : AledTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{
}