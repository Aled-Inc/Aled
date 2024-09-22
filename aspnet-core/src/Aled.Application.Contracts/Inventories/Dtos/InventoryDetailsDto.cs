using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Auditing;

namespace Aled.Inventories.Dtos;

[Serializable]
public class InventoryDetailsDto : EntityDto<Guid>, IHasCreationTime
{
    public DateTime CreationTime { get; set; }
    public int UnknownProductCount { get; set; }
    public int CupboardProductCount { get; set; }
    public int FridgeProductCount { get; set; }
    public int FreezerProductCount { get; set; }
    public int ProductCount { get; set; }
}