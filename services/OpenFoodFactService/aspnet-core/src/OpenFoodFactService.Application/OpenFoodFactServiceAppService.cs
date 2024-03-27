using System;
using System.Collections.Generic;
using System.Text;
using OpenFoodFactService.Localization;
using Volo.Abp.Application.Services;

namespace OpenFoodFactService;

/* Inherit your application services from this class.
 */
public abstract class OpenFoodFactServiceAppService : ApplicationService
{
    protected OpenFoodFactServiceAppService()
    {
        LocalizationResource = typeof(OpenFoodFactServiceResource);
    }
}
