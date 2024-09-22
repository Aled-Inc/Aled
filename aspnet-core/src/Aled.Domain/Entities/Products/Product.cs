using System;
using System.Collections.Generic;
using System.Linq;
using Aled.AggregateRoots.Inventories;
using Aled.Products;
using Volo.Abp.Domain.Entities;

namespace Aled.Entities.Products;

public class Product : Entity<Guid>
{
    public Guid InventoryId { get; set; }
    public string Code { get; set; } = string.Empty;

    public string ProductName { get; set; } = string.Empty;

    public string Brands { get; set; } = string.Empty;

    public int Quantity { get; set; } = 1;
    
    public string? IngredientsText { get; set; } = string.Empty;

    public string? Allergens { get; set; } = string.Empty;

    public string ImageFrontUrl { get; set; } = string.Empty;

    public DateTime ExpirationDate { get; set; }
    
    public DateTime AddedDate { get; set; }
    
    public List<string>? CategoryTags { get; set; } = [];

    public ProductCategoryTagsEnum ProductCategoryTag { get; set; } = ProductCategoryTagsEnum.Undefined;

    public Inventory Inventory { get; protected set; }
    
    private readonly List<string> _expectedCupboardCategoryTags =
    [
        "en:biscuits",
        "en:snacks",
        "en:sweets",
        "en:dry-goods",
        "en:canned-foods",
        "en:rice",
        "en:pasta",
        "en:flour",
        "en:sugar",
        "en:chocolate",
        "en:coffee",
        "en:tea",
        "en:nuts",
        "en:seeds",
        "en:herbs-and-spices",
        "en:spreads",
        "en:baking-ingredients",
        "en:cereal",
        "en:crackers",
        "en:sauces",
        "en:oil",
        "en:vinegar",
        "en:shelf-stable",
        "en:condiments",
        "en:soups",
        "en:bouillons",
        "en:dry-soups",
        "en:instant-noodles",
        "en:peanut-butter",
        "en:chips",
        "en:popcorn",
        "en:granola-bars",
        "en:energy-bars",
        "en:instant-coffee",
        "en:powdered-drinks",
        "en:bottled-water",
        "en:breads"
    ];
    
    private readonly List<string> _expectedFridgeCategoryTags =
    [
        "en:refrigerated",
        "en:dairy-products",
        "en:cheese",
        "en:yogurts",
        "en:cold-cuts",
        "en:fresh-meat",
        "en:fresh-vegetables",
        "en:fresh-fruit",
        "en:sauces",
        "en:fresh-pasta",
        "en:fresh-juice",
        "en:smoothies",
        "en:eggs",
        "en:prepared-meals",
        "en:sandwiches",
        "en:hummus",
        "en:sushi",
        "en:butter",
        "en:margarine",
        "en:milk",
        "en:cream",
        "en:fresh-salad",
        "en:tofu",
        "en:sour-cream",
        "en:fresh-herbs",
        "en:soft-cheeses",
        "en:cottage-cheese",
        "en:ricotta",
        "en:fresh-sausage",
        "en:smoked-fish",
        "en:caviar",
        "en:fresh-dough",
        "en:meals",
        "en:dairies",
        "en:cheeses"
    ];
    
    private readonly List<string> _expectedFreezerCategoryTags =
    [
        "en:frozen",
        "en:ice-cream",
        "en:frozen-foods",
        "en:frozen-desserts",
        "en:frozen-meals",
        "en:frozen-vegetables",
        "en:frozen-fruits",
        "en:frozen-pizza",
        "en:frozen-bread",
        "en:frozen-seafood",
        "en:frozen-meat",
        "en:frozen-pastry",
        "en:frozen-dough",
        "en:frozen-potato-products",
        "en:perishable",
        "en:frozen-poultry",
        "en:frozen-burgers",
        "en:frozen-cakes",
        "en:frozen-yogurt",
        "en:frozen-soups",
        "en:frozen-lasagna",
        "en:frozen-pie",
        "en:frozen-batter",
        "en:frozen-waffles",
        "en:frozen-pancakes",
        "en:frozen-smoothie-mix",
        "en:frozen-pasta",
        "en:frozen-dumplings"
    ];

    public void CalculateProductCategoryTag()
    {
        ProductCategoryTag = IsFreezer() ? ProductCategoryTagsEnum.Freezer :
            IsFridge() ? ProductCategoryTagsEnum.Fridge :
            IsCupboard() ? ProductCategoryTagsEnum.Cupboard : 
            ProductCategoryTagsEnum.Undefined;
    }
    
    public void CalculateExpirationDate()
    {
        ExpirationDate = IsFreezer() ? DateTime.Today.AddDays(7) :
            IsFridge() ? DateTime.Today.AddDays(14) :
            IsCupboard() ? DateTime.Today.AddDays(21) : 
            DateTime.Today;
    }

    private bool IsCupboard()
    {
        return ProductCategoryTag == ProductCategoryTagsEnum.Cupboard || CategoryTags != null && CategoryTags.Any(tag => _expectedCupboardCategoryTags.Contains(tag));
    }
    
    private bool IsFridge()
    {
        return ProductCategoryTag == ProductCategoryTagsEnum.Fridge || CategoryTags != null && CategoryTags.Any(tag => _expectedFridgeCategoryTags.Contains(tag));
    }
    
    private bool IsFreezer()
    {
        return ProductCategoryTag == ProductCategoryTagsEnum.Freezer || CategoryTags != null && CategoryTags.Any(tag => _expectedFreezerCategoryTags.Contains(tag));
    }
}