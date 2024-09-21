using System;
using System.Threading.Tasks;
using Aled.Entities.Products;
using Aled.OpenFoodFactService.Products;
using Aled.OpenFoodFactService.Products.Dtos;
using AutoMapper;

namespace Aled.Fakes.Services;

public class ProductProxyAppServiceFake : InMemoryBasicRepository<Product, Guid>, IProductAppService
{
    private readonly IMapper _mapper;

    public ProductProxyAppServiceFake(IMapper mapper)
    {
        _mapper = mapper;
    }

    public async Task<ProductDto> GetAsync(GetProductDto getProductDto)
    {
        var product = await FindAsync(p => p.Code == getProductDto.Code);

        return _mapper.Map<Product, ProductDto>(product!);
    }
}