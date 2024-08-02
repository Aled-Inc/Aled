using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Volo.Abp.Application.Dtos;

namespace Aled.Products.Dtos;

public class AddProductDto : EntityDto, IValidatableObject
{
    private DateTime _expirationDate;
    public string Name { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;

    public DateTime ExpirationDate
    {
        get => _expirationDate.ClearTime();
        set => _expirationDate = value;
    }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (string.IsNullOrEmpty(Name))
        {
            yield return new ValidationResult("The product name must not be empty", [nameof(Name)]);
        }

        if (Code.Length is not ProductScannedCodes.ProductCodeLength)
        {
            yield return new ValidationResult("The product code must be 13 characters long", [nameof(Code)]);
        }

        if (!Code.All(char.IsDigit))
        {
            yield return new ValidationResult("The product code must contain only digits", new[] { nameof(Code) });
        }

        if (ExpirationDate <= DateTime.Now)
        {
            yield return new ValidationResult("The expiration date must be in the future",
                new[] { nameof(ExpirationDate) });
        }
    }
}