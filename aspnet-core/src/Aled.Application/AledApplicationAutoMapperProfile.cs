using Aled.AggregateRoots.Inventories;
using Aled.Entities.Products;
using Aled.IdentityUsers.Dtos;
using Aled.Inventories.Dtos;
using Aled.Products.Dtos;
using AutoMapper;
using Volo.Abp.Identity;

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

        CreateMap<OpenFoodFactService.Products.Dtos.ProductDto, ProductScannedDto>()
            .ReverseMap();

        CreateMap<Product, RemoveProductDto>()
            .ReverseMap();

        CreateMap<IdentityUser, IdentityUserExtendedDto>();
    }
}