using System.Threading.Tasks;
using Aled.OpenFoodFactService.Products.Dtos;
using Volo.Abp.Application.Services;
using ProductDetailsDto = Aled.Products.Dtos.ProductDetailsDto;

namespace Aled.Products;

public class ProductAppService : ApplicationService, IProductAppService
{
    private readonly OpenFoodFactService.Products.IProductAppService _productAppService;

    public ProductAppService(OpenFoodFactService.Products.IProductAppService productAppService)
    {
        _productAppService = productAppService;
    }

    public async Task<ProductDetailsDto> GetAsync(string code)
    {
        var product = await _productAppService.GetAsync(new GetProductDto { Code = code });
        
        return ObjectMapper.Map<Aled.OpenFoodFactService.Products.Dtos.ProductDetailsDto, ProductDetailsDto>(product.ProductDetails);
    }
}