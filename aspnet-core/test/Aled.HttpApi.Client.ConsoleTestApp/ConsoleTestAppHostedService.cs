using System.Threading;
using System.Threading.Tasks;
using Aled.HttpApi.Client.ConsoleTestApp.OpenFoodFacts;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Volo.Abp;

namespace Aled.HttpApi.Client.ConsoleTestApp;

public class ConsoleTestAppHostedService(IConfiguration configuration) : IHostedService
{
    public async Task StartAsync(CancellationToken cancellationToken)
    {
        using var application = await AbpApplicationFactory.CreateAsync<AledConsoleApiClientModule>(options =>
        {
            options.Services.ReplaceConfiguration(configuration);
            options.UseAutofac();
        });

        await application.InitializeAsync();

        var helloWorldAppService = application.ServiceProvider.GetRequiredService<HealthCheckAppService>();
        await helloWorldAppService.RunAsync();

        await application.ShutdownAsync();
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }
}