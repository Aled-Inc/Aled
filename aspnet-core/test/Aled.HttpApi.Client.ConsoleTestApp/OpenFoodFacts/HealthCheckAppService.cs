using System;
using System.Threading.Tasks;
using Aled.OpenFoodFactService;
using Volo.Abp.DependencyInjection;

namespace Aled.HttpApi.Client.ConsoleTestApp.OpenFoodFacts;

public class HealthCheckAppService(IHealthCheckAppService healthCheckAppService) : ITransientDependency
{
    public async Task RunAsync()
    {
        var result = await healthCheckAppService.CheckAsync();
        Console.WriteLine(result);
    }
}