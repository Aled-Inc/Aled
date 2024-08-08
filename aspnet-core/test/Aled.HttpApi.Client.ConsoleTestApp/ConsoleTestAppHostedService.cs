using System.Threading;
using System.Threading.Tasks;
using Aled.HttpApi.Client.ConsoleTestApp.OpenFoodFactServices.Products;
using Aled.OpenFoodFactService.Products.Dtos;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Volo.Abp;

namespace Aled.HttpApi.Client.ConsoleTestApp;

public class ConsoleTestAppHostedService : IHostedService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<ConsoleTestAppHostedService> _logger;

    public ConsoleTestAppHostedService(IConfiguration configuration, ILogger<ConsoleTestAppHostedService> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        using var application = await AbpApplicationFactory.CreateAsync<AledConsoleApiClientModule>(options =>
        {
            options.Services.ReplaceConfiguration(_configuration);
            options.UseAutofac();
        });

        await application.InitializeAsync();

        var productAppService = application.ServiceProvider.GetRequiredService<OpenFoodFactServiceProductAppService>();
        var product = await productAppService.RunAsync(new GetProductDto
        {
            Code = "5449000000439"
        });

        _logger.LogInformation("Product: {Product}, Name: {Name}, Code: {Code}, ExpirationDate: {ExpirationDate}",
            product,
            product.ProductDetails.ProductName,
            product.Code);

        await application.ShutdownAsync();
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }
}