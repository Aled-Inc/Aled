using OpenFoodFactService.Localization;
using Volo.Abp.AspNetCore.Mvc.UI.RazorPages;

namespace OpenFoodFactService.Web.Pages;

/* Inherit your PageModel classes from this class.
 */
public abstract class OpenFoodFactServicePageModel : AbpPageModel
{
    protected OpenFoodFactServicePageModel()
    {
        LocalizationResourceType = typeof(OpenFoodFactServiceResource);
        ObjectMapperContext = typeof(OpenFoodFactServiceWebModule);
    }
}
