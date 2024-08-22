using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;

namespace Aled.Products.Dtos;

public class ProductScannedDto : EntityDto, IValidatableObject
{
    [Required] [StringLength(13)] public string Code { get; set; } = string.Empty;

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (Code.Length is not ProductScannedCodes.ProductCodeLength)
        {
            yield return new ValidationResult("The Code must be 13 characters long", new[] { nameof(Code) });
        }
    }
}