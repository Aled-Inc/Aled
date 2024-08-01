using System;
using Aled.AggregateRoots.Inventories;
using Volo.Abp.Domain.Entities;

namespace Aled.Entities.Products;

public class Product : Entity<Guid>
{
    public Guid InventoryId { get; set; }

    public string Name { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public DateTime ExpirationDate { get; set; }

    public Inventory Inventory { get; protected set; }
}