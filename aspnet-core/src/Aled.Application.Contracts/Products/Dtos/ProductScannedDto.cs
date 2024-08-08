using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;

namespace Aled.Products.Dtos;

public class ProductScannedDto : EntityDto, IValidatableObject
{
    private DateTime _expirationDate;

    [Required] [StringLength(13)] public string Code { get; set; } = string.Empty;

    [Required]
    public DateTime ExpirationDate
    {
        get => _expirationDate.ClearTime();
        set => _expirationDate = value;
    }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (Code.Length is not ProductScannedCodes.ProductCodeLength)
        {
            yield return new ValidationResult("The Code must be 13 characters long", new[] { nameof(Code) });
        }

        if (ExpirationDate < DateTime.Now.ClearTime())
        {
            yield return new ValidationResult("The Expiration Date must be greater than or equal to today",
                new[] { nameof(ExpirationDate) });
        }
    }
}