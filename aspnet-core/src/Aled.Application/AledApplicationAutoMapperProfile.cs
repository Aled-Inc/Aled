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
        CreateMap<Inventory, InventoryDto>();
        CreateMap<Product, ProductDto>();
        CreateMap<IdentityUser, IdentityUserExtendedDto>();
    }
}