using OpenFoodFactService.Localization;
using Volo.Abp.AspNetCore.Components;

namespace OpenFoodFactService.Blazor.Server.Host;

public abstract class OpenFoodFactServiceComponentBase : AbpComponentBase
{
    protected OpenFoodFactServiceComponentBase()
    {
        LocalizationResource = typeof(OpenFoodFactServiceResource);
    }
}
