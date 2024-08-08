using System;
using Aled.AggregateRoots.Inventories;
using Volo.Abp.Domain.Entities;

namespace Aled.Entities.Products;

public class Product : Entity<Guid>
{
    public Guid InventoryId { get; set; }
    public string Code { get; set; } = string.Empty;

    public string ProductName { get; set; } = string.Empty;

    public string Brands { get; set; } = string.Empty;

    public string IngredientsText { get; set; } = string.Empty;

    public string Allergens { get; set; } = string.Empty;

    public string ImageFrontUrl { get; set; } = string.Empty;

    public DateTime ExpirationDate { get; set; }

    public Inventory Inventory { get; protected set; }
}