using Volo.Abp.AspNetCore.Components.WebAssembly.Theming;
using Volo.Abp.Modularity;

namespace OpenFoodFactService.Blazor.WebAssembly;

[DependsOn(
    typeof(OpenFoodFactServiceBlazorModule),
    typeof(OpenFoodFactServiceHttpApiClientModule),
    typeof(AbpAspNetCoreComponentsWebAssemblyThemingModule)
    )]
public class OpenFoodFactServiceBlazorWebAssemblyModule : AbpModule
{

}
