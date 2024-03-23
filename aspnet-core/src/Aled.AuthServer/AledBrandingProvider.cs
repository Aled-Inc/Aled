using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace Aled;

[Dependency(ReplaceServices = true)]
public class AledBrandingProvider : DefaultBrandingProvider
{
    public override string AppName => "Aled";
}