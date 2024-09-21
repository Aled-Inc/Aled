using System;
using System.Threading.Tasks;
using Aled.Entities.Products;
using Aled.Fakes.Services;
using Aled.Products;
using Shouldly;
using Xunit;

namespace Aled.UnitTests.Products;

public class ProductAppServiceTest : AledApplicationTestBase<AledApplicationTestModule>
{
    private readonly ProductAppService _productAppService;
    private readonly ProductProxyAppServiceFake? _productProxyAppServiceFake;
    
    private static readonly Product Product = new()
    {
        Code = "1234567891011",
        AddedDate = DateTime.Today,
    };

    public ProductAppServiceTest()
    {
        _productAppService = GetRequiredService<ProductAppService>();
        _productProxyAppServiceFake = GetRequiredService<OpenFoodFactService.Products.IProductAppService>() as ProductProxyAppServiceFake;
    }

    protected override async Task InitFixtureAsync()
    {
        await base.InitFixtureAsync();
        await _productProxyAppServiceFake?.InsertAsync(Product)!;
    }

    [Fact]
    public async Task ProductAppService_GetAsync_ShouldReturnProduct()
    {
        await InitFixtureAsync();

        var product = await _productAppService.GetAsync(Product.Code);
        
        product.ShouldNotBeNull();
    }
    
    [Fact]
    public async Task ProductAppService_GetAsyncReturnNull_ShouldThrowException()
    {
        await InitFixtureAsync();

        await Assert.ThrowsAsync<Exception>(() => _productAppService.GetAsync(Guid.NewGuid().ToString()));
    }
}