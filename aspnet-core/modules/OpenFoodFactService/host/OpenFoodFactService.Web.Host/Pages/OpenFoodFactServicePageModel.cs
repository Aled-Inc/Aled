using OpenFoodFactService.Localization;
using Volo.Abp.AspNetCore.Mvc.UI.RazorPages;

namespace OpenFoodFactService.Pages;

public abstract class OpenFoodFactServicePageModel : AbpPageModel
{
    protected OpenFoodFactServicePageModel()
    {
        LocalizationResourceType = typeof(OpenFoodFactServiceResource);
    }
}
