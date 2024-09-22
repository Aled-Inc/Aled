using System.Linq;
using Aled.AggregateRoots.Inventories;
using Aled.Entities.Products;
using Aled.IdentityUsers.Dtos;
using Aled.Inventories.Dtos;
using Aled.Products;
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
            .ForMember(
                dest => dest.UnknownProductCount,
                opt =>
                    opt.MapFrom(src => src.Products.Count(product => product.ProductCategoryTag == ProductCategoryTagsEnum.Undefined)))
            .ForMember(
                dest => dest.CupboardProductCount,
                opt =>
                    opt.MapFrom(src => src.Products.Count(product => product.ProductCategoryTag == ProductCategoryTagsEnum.Cupboard)))
            .ForMember(
                dest => dest.FridgeProductCount,
                opt =>
                    opt.MapFrom(src => src.Products.Count(product => product.ProductCategoryTag == ProductCategoryTagsEnum.Fridge)))
            .ForMember(
                dest => dest.FreezerProductCount,
                opt =>
                    opt.MapFrom(src => src.Products.Count(product => product.ProductCategoryTag == ProductCategoryTagsEnum.Freezer)))
            .ForMember(
                dest => dest.ProductCount,
                opt =>
                    opt.MapFrom(src => src.Products.Count))
            .ReverseMap();
        
        CreateMap<Inventory, InventoryDetailsDto>()
            .ForMember(
                dest => dest.UnknownProductCount,
                opt =>
                    opt.MapFrom(src => src.Products.Count(product => product.ProductCategoryTag == ProductCategoryTagsEnum.Undefined)))
            .ForMember(
                dest => dest.CupboardProductCount,
                opt =>
                    opt.MapFrom(src => src.Products.Count(product => product.ProductCategoryTag == ProductCategoryTagsEnum.Cupboard)))
            .ForMember(
                dest => dest.FridgeProductCount,
                opt =>
                    opt.MapFrom(src => src.Products.Count(product => product.ProductCategoryTag == ProductCategoryTagsEnum.Fridge)))
            .ForMember(
                dest => dest.FreezerProductCount,
                opt =>
                    opt.MapFrom(src => src.Products.Count(product => product.ProductCategoryTag == ProductCategoryTagsEnum.Freezer)))
            .ForMember(
                dest => dest.ProductCount,
                opt =>
                    opt.MapFrom(src => src.Products.Count))
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
        CreateMap<Aled.OpenFoodFactService.Products.Dtos.ProductDetailsDto, ProductDetailsDto>().ReverseMap();
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