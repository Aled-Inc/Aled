using System;
using System.Collections.Generic;
using System.Linq;
using Aled.Entities.Products;
using Aled.Products;
using Volo.Abp;
using Volo.Abp.Auditing;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Identity;

namespace Aled.AggregateRoots.Inventories;

public sealed class Inventory : AggregateRoot<Guid>, IHasCreationTime
{
    
    
    private Inventory()
    {
    }

    public Inventory(IdentityUser user)
    {
        UserId = user.Id;
        SetIdentityUser(user);
        CreationTime = DateTime.Now;
    }

    public Guid UserId { get; init; }
    public IdentityUser User { get; set; } = default!;
    public ICollection<Product> Products { get; init; } = new List<Product>();
    public DateTime CreationTime { get; init; }

    public void AddProduct(Product product)
    {
        Check.NotNull(product.Code,
            nameof(product.Code));

        Check.Length(product.Code,
            nameof(product.Code),
            ProductScannedCodes.ProductCodeLength,
            ProductScannedCodes.ProductCodeLength);

        Check.NotNull(product.ExpirationDate,
            nameof(product));
        
        Check.NotNull(product.AddedDate,
            nameof(product));

        product.CalculateProductCategoryTag();
        product.CalculateExpirationDate();

        product.InventoryId = Id;
        product.AddedDate = DateTime.Now;
        Products.Add(product);
    }

    public void RemoveProduct(Guid productId)
    {
        Check.NotNull(productId, nameof(productId));

        var product = Products.FirstOrDefault(p => p.Id == productId);

        if (product is not null)
        {
            Products.Remove(product);
        }
    }

    private void SetIdentityUser(IdentityUser user)
    {
        User = Check.NotNull(user, nameof(user));
    }
}