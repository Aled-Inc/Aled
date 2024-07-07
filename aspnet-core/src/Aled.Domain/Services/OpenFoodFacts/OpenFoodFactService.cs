using System.Threading.Tasks;
using Aled.OpenFoodFactService;
using Volo.Abp.DependencyInjection;

namespace Aled.Services.OpenFoodFacts;

public class OpenFoodFactService(IHealthCheckAppService healthCheckAppService) : ITransientDependency
{
    public async Task<string> CheckHealthAsync()
    {
        return await healthCheckAppService.GetStatusAsync();
    }
}