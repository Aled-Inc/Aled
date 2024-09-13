using Volo.Abp.Application.Dtos;

namespace Aled.Products.Dtos;

public class ProductDetailsDto : EntityDto
{
    public string ProductName { get; set; }

    public string Brands { get; set; }

    public string IngredientsText { get; set; }

    public string Allergens { get; set; }

    public string ImageFrontUrl { get; set; }

    public string[] CategoryTags { get; set; }

    public string IngredientsOrigins { get; set; }

    public string Manufacturing { get; set; }

    public string Packaging { get; set; }

    public int NovaGroup { get; set; }

    public NutrientLevelsDto NutriscoreGrade { get; set; }

    public NutrimentsDto Nutriments { get; set; }

    public VitaminsDto Vitamins { get; set; }
}