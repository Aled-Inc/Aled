using System.Threading.Tasks;
using Aled.OpenFoodFactService;
using Volo.Abp.DependencyInjection;

namespace Aled.Managers.OpenFoodFacts;

public class OpenFoodFactService : ITransientDependency
{
    private readonly IHealthCheckAppService _healthCheckAppService;

    public OpenFoodFactService(IHealthCheckAppService healthCheckAppService)
    {
        _healthCheckAppService = healthCheckAppService;
    }

    public async Task<string> CheckHealthAsync()
    {
        return await _healthCheckAppService.GetStatusAsync();
    }
}