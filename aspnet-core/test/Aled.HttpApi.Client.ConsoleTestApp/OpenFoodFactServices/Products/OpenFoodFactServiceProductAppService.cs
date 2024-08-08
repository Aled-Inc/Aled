using System.Threading.Tasks;
using Aled.OpenFoodFactService.Products;
using Aled.OpenFoodFactService.Products.Dtos;
using Volo.Abp.DependencyInjection;

namespace Aled.HttpApi.Client.ConsoleTestApp.OpenFoodFactServices.Products;

public class OpenFoodFactServiceProductAppService : ITransientDependency
{
    private readonly IProductAppService _productAppService;

    public OpenFoodFactServiceProductAppService(IProductAppService productAppService)
    {
        _productAppService = productAppService;
    }

    public async Task<ProductDto> RunAsync(GetProductDto product)
    {
        return await _productAppService.GetAsync(product);
    }
}