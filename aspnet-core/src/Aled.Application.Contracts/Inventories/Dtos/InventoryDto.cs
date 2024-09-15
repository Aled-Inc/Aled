using System;
using System.Collections.Generic;
using System.Linq;
using Aled.Products;
using Aled.Products.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Auditing;

namespace Aled.Inventories.Dtos;

[Serializable]
public class InventoryDto : EntityDto<Guid>, IHasCreationTime
{
    public ICollection<ProductDto> Products { get; set; } = new List<ProductDto>();
    public DateTime CreationTime { get; set; }
    public int UnknownProductCount => Products.Count(product => product.ProductCategoryTag == ProductCategoryTagsEnum.Undefined);
    public int CupboardProductCount => Products.Count(product => product.ProductCategoryTag == ProductCategoryTagsEnum.Cupboard);
    public int FridgeProductCount => Products.Count(product => product.ProductCategoryTag == ProductCategoryTagsEnum.Fridge);
    public int FreezerProductCount => Products.Count(product => product.ProductCategoryTag == ProductCategoryTagsEnum.Freezer);
    public int ProductCount => Products.Count;
}