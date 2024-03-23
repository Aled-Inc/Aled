using Volo.Abp.Ui.Branding;
using Volo.Abp.DependencyInjection;

namespace Aled;

[Dependency(ReplaceServices = true)]
public class AledBrandingProvider : DefaultBrandingProvider
{
    public override string AppName => "Aled";
}
