using System;
using System.Threading.Tasks;
using Aled.OpenFoodFactService;
using Volo.Abp.DependencyInjection;

namespace Aled.HttpApi.Client.ConsoleTestApp.OpenFoodFacts;


public class HealthCheckAppService : ITransientDependency
{
    private readonly IHealthCheckAppService _healthCheckAppService;
    public HealthCheckAppService(IHealthCheckAppService healthCheckAppService)
    {
        _healthCheckAppService = healthCheckAppService;
    }

    public async Task RunAsync()
    {
        var result = await _healthCheckAppService.GetStatusAsync();
        Console.WriteLine(result);
    }
}