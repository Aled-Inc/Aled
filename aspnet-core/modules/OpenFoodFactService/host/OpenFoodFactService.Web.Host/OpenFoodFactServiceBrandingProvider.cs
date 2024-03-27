using Volo.Abp.Ui.Branding;
using Volo.Abp.DependencyInjection;

namespace OpenFoodFactService;

[Dependency(ReplaceServices = true)]
public class OpenFoodFactServiceBrandingProvider : DefaultBrandingProvider
{
    public override string AppName => "OpenFoodFactService";
}
