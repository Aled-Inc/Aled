using Volo.Abp.Modularity;

namespace OpenFoodFactService;

public abstract class OpenFoodFactServiceApplicationTestBase<TStartupModule> : OpenFoodFactServiceTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
