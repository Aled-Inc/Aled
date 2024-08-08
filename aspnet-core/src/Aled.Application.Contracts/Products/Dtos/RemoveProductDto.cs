using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;

namespace Aled.Products.Dtos;

public class RemoveProductDto : EntityDto, IValidatableObject
{
    [Required] public string ProductId { get; set; } = string.Empty;

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (Guid.TryParse(ProductId, out _) is false)
        {
            yield return new ValidationResult("The product ID must be valid", [nameof(ProductId)]);
        }
    }
}