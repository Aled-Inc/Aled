using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;

namespace Aled.Products.Dtos;

public class ProductDto : EntityDto<Guid>
{
    private DateTime _expirationDate;

    public string Code { get; set; } = string.Empty;

    public string ProductName { get; set; } = string.Empty;

    public string Brands { get; set; } = string.Empty;
    
    public int Quantity { get; set; }

    public string IngredientsText { get; set; } = string.Empty;

    public string Allergens { get; set; } = string.Empty;

    public string ImageFrontUrl { get; set; } = string.Empty;

    public DateTime ExpirationDate
    {
        get => _expirationDate.ClearTime();
        set => _expirationDate = value;
    }

    public DateTime AddedDate { get; set; }

    public List<string> CategoryTags { get; set; } = [];

    public ProductCategoryTagsEnum ProductCategoryTag { get; set; } = ProductCategoryTagsEnum.Cupboard;
}