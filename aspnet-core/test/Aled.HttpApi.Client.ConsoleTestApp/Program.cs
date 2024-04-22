using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Aled.HttpApi.Client.ConsoleTestApp;

public static class Program
{
    public static async Task Main(string[] args)
    {
        await CreateHostBuilder(args).RunConsoleAsync();
    }

    private static IHostBuilder CreateHostBuilder(string[] args)
    {
        return Host.CreateDefaultBuilder(args)
            .AddAppSettingsSecretsJson()
            .ConfigureServices((hostContext, services) =>
            {
                services.AddHostedService<ConsoleTestAppHostedService>();
            });
    }
}