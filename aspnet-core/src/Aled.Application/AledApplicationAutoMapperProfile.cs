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
        CreateMap<Inventory, InventoryDto>()
            .ForMember(
                dest => dest.Products,
                opt =>
                    opt.MapFrom(src => src.Products))
            .ReverseMap();

        CreateMap<Product, ProductDto>()
            .ReverseMap();

        CreateMap<Product, AddProductDto>()
            .ReverseMap();

        CreateMap<Product, RemoveProductDto>()
            .ReverseMap();
    }
}