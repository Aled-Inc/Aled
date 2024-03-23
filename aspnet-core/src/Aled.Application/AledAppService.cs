using System;
using System.Collections.Generic;
using System.Text;
using Aled.Localization;
using Volo.Abp.Application.Services;

namespace Aled;

/* Inherit your application services from this class.
 */
public abstract class AledAppService : ApplicationService
{
    protected AledAppService()
    {
        LocalizationResource = typeof(AledResource);
    }
}
