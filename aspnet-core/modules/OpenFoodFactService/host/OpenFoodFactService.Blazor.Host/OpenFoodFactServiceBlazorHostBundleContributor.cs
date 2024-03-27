using Volo.Abp.Bundling;

namespace OpenFoodFactService.Blazor.Host;

public class OpenFoodFactServiceBlazorHostBundleContributor : IBundleContributor
{
    public void AddScripts(BundleContext context)
    {

    }

    public void AddStyles(BundleContext context)
    {
        context.Add("main.css", true);
    }
}
