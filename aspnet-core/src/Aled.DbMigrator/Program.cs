using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using DotNetEnv;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NUglify.Helpers;
using Serilog;
using Serilog.Events;

namespace Aled.DbMigrator;

internal class Program
{
    private static async Task Main(string[] args)
    {
        Log.Logger = new LoggerConfiguration()
            .MinimumLevel.Information()
            .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
            .MinimumLevel.Override("Volo.Abp", LogEventLevel.Warning)
#if DEBUG
            .MinimumLevel.Override("Aled", LogEventLevel.Debug)
#else
                .MinimumLevel.Override("Aled", LogEventLevel.Information)
#endif
            .Enrich.FromLogContext()
            .WriteTo.Async(c => c.File("Logs/logs.txt"))
            .WriteTo.Async(c => c.Console())
            .CreateLogger();

        await CreateHostBuilder(args).RunConsoleAsync();
    }

    private static IHostBuilder CreateHostBuilder(string[] args)
    {
        return Host.CreateDefaultBuilder(args)
            .AddAppSettingsSecretsJson()
            .ConfigureLogging((context, logging) => logging.ClearProviders())
            .ConfigureServices((hostContext, services) =>
            {
                if (hostContext.HostingEnvironment.IsDevelopment())
                {
                    var srcFolderPath = Directory.GetParent(Directory.GetCurrentDirectory())!.Parent!.Parent!.Parent!.FullName;
                    
                    Env.Load($"{srcFolderPath}/.env");
                    
                    var envKeys = new Dictionary<string, string>
                    {
                        {"OpenIddict:Applications:Aled_BlazorServerTiered:RootUrl", "BLAZOR_URL"},
                        {"OpenIddict:Applications:Aled_Swagger:RootUrl", "API_HOST_URL"},
                    };
                    
                    envKeys.ForEach(pair =>
                    {
                        var value =  Env.GetString(pair.Value);
                        
                        if (string.IsNullOrEmpty(value))
                        {
                            throw new Exception($"ConfigurationError: an error occured on {pair.Value} env key. Ensure the .env file is correctly configured and placed in the root directory.");
                        }
                        
                        hostContext.Configuration[pair.Key] = value;
                    });
                }
                
                services.AddHostedService<DbMigratorHostedService>();
            });
    }
}