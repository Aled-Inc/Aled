using System;
using System.Collections.Generic;
using Aled.Products.Dtos;
using Volo.Abp.Auditing;

namespace Aled.Inventories.Dtos;

[Serializable]
public class InventoryDto : InventoryDetailsDto
{
    public ICollection<ProductDto> Products { get; set; } = new List<ProductDto>();
}