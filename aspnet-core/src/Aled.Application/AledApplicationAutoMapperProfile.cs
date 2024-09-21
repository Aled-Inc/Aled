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

        CreateMap<Aled.OpenFoodFactService.Products.Dtos.NutrientsDto, NutrientsDto>().ReverseMap();
        CreateMap<Aled.OpenFoodFactService.Products.Dtos.NutrientLevelsDto, NutrientLevelsDto>().ReverseMap();
        CreateMap<Aled.OpenFoodFactService.Products.Dtos.ProductDetailsDto, ProductDetailsDto>()
            .ForMember(dest => dest.Vitamins, opt => opt.MapFrom(src => src.GetVitamins()))
            .ReverseMap();
        CreateMap<Aled.OpenFoodFactService.Products.Dtos.VitaminsDto, VitaminsDto>().ReverseMap();

        CreateMap<Product, OpenFoodFactService.Products.Dtos.ProductDto>()
            .ForPath(dest => dest.ProductDetails.ProductName,
                opt => opt.MapFrom(x => x.ProductName))
            .ForPath(dest => dest.ProductDetails.Brands, 
                opt => opt.MapFrom(x => x.Brands))
            .ForPath(dest => dest.ProductDetails.IngredientsText, 
                opt => opt.MapFrom(x => x.IngredientsText))
            .ForPath(dest => dest.ProductDetails.Allergens, 
                opt => opt.MapFrom(x => x.Allergens))
            .ForPath(dest => dest.ProductDetails.ImageFrontUrl, 
                opt => opt.MapFrom(x => x.ImageFrontUrl))
            .ForPath(dest => dest.ProductDetails.CategoryTags, 
                opt => opt.MapFrom(x => x.CategoryTags))
            .ReverseMap();
    }
}