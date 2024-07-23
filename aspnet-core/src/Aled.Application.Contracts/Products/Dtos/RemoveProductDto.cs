using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;

namespace Aled.Products.Dtos;

public class RemoveProductDto : EntityDto, IValidatableObject
{
    public Guid Id { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (Id == Guid.Empty)
        {
            yield return new ValidationResult("The product ID must be valid", [nameof(Id)]);
        }
    }
}