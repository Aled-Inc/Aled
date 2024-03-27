using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace OpenFoodFactService.Blazor.Server.Host;

[Dependency(ReplaceServices = true)]
public class OpenFoodFactServiceBrandingProvider : DefaultBrandingProvider
{
    public override string AppName => "OpenFoodFactService";
}
