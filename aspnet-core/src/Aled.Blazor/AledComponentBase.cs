using Aled.Localization;
using Volo.Abp.AspNetCore.Components;

namespace Aled.Blazor;

public abstract class AledComponentBase : AbpComponentBase
{
    protected AledComponentBase()
    {
        LocalizationResource = typeof(AledResource);
    }
}