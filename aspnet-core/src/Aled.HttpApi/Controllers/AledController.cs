using Aled.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace Aled.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class AledController : AbpControllerBase
{
    protected AledController()
    {
        LocalizationResource = typeof(AledResource);
    }
}