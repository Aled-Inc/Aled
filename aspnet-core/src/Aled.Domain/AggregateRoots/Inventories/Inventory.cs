using System;
using System.Collections.Generic;
using Aled.Entities.Products;
using Volo.Abp.Auditing;
using Volo.Abp.Domain.Entities;

namespace Aled.AggregateRoots.Inventories;

public class Inventory : BasicAggregateRoot<Guid>, IHasCreationTime
{
    public Guid UserId { get; init; }
    public ICollection<Product> Products { get; init; } = new List<Product>();
    public DateTime CreationTime { get; init; }

    public void ClearProducts()
    {
        Products.Clear();
    }
}