using System;
using Volo.Abp.Application.Dtos;

namespace Aled.Products.Dtos;

public class ProductDto : EntityDto<Guid>
{
    private DateTime _expirationDate;

    public string Code { get; set; } = string.Empty;

    public string ProductName { get; set; } = string.Empty;

    public string Brands { get; set; } = string.Empty;

    public string IngredientsText { get; set; } = string.Empty;

    public string Allergens { get; set; } = string.Empty;

    public string ImageFrontUrl { get; set; } = string.Empty;

    public DateTime ExpirationDate
    {
        get => _expirationDate.ClearTime();
        set => _expirationDate = value;
    }
}