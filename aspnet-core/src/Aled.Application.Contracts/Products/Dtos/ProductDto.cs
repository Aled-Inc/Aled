using System;
using Volo.Abp.Application.Dtos;

namespace Aled.Products.Dtos;

public class ProductDto : EntityDto<Guid>
{
    private DateTime _expirationDate;
    public string Name { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;

    public DateTime ExpirationDate
    {
        get => _expirationDate.ClearTime();
        set => _expirationDate = value;
    }
}