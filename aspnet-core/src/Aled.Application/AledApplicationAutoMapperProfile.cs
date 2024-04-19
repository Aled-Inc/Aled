using Aled.AggregateRoots.Inventories;
using Aled.Entities.Products;
using Aled.Inventories.Dtos;
using Aled.Products.Dtos;
using AutoMapper;

namespace Aled;

public class AledApplicationAutoMapperProfile : Profile
{
    public AledApplicationAutoMapperProfile()
    {
        CreateMap<Inventory, InventoryDto>();
        CreateMap<Product, ProductDto>();
    }
}