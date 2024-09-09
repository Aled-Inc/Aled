using System;
using Aled.Entities.Products;
using Aled.OpenFoodFactService.Products.Dtos;
using AutoMapper;

namespace Aled;

public class AledDomainAutoMapperProfile : Profile
{
    public AledDomainAutoMapperProfile()
    {
        CreateMap<ProductDto, Product>()
            .ForMember(
                dest => dest.Id,
                opt =>
                    opt.MapFrom(src => Guid.NewGuid()))
            .ForMember(
                dest => dest.ProductName,
                opt =>
                    opt.MapFrom(src => src.ProductDetails.ProductName))
            .ForMember(
                dest => dest.Brands,
                opt =>
                    opt.MapFrom(src => src.ProductDetails.Brands))
            .ForMember(
                dest => dest.IngredientsText,
                opt =>
                    opt.MapFrom(src => src.ProductDetails.IngredientsText))
            .ForMember(
                dest => dest.Allergens,
                opt =>
                    opt.MapFrom(src => src.ProductDetails.Allergens))
            .ForMember(
                dest => dest.ImageFrontUrl,
                opt =>
                    opt.MapFrom(src => src.ProductDetails.ImageFrontUrl))
            .ForMember(
                dest => dest.CategoryTags,
                opt =>
                    opt.MapFrom(src => src.ProductDetails.CategoryTags));
    }
}