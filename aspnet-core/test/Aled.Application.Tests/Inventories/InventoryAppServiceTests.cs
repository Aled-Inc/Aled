using System;
using System.Linq;
using System.Threading.Tasks;
using Aled.Products.Dtos;
using Shouldly;
using Volo.Abp.Modularity;
using Xunit;

namespace Aled.Inventories;

public abstract class InventoryAppServiceTests<TStartupModule> : AledApplicationTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{
    private readonly IInventoryAppService _inventoryAppService;

    protected InventoryAppServiceTests()
    {
        _inventoryAppService = base.GetRequiredService<IInventoryAppService>();
    }

    [Fact]
    public async Task GetAsync_Should_Return_Non_Null_Inventory()
    {
        // Arrange
        // Nothing to arrange
        
        // Action
        var inventory = await _inventoryAppService.GetAsync();

        // Assert
        inventory.ShouldNotBeNull();
    }

    [Fact]
    public async Task AddProductAsync_Should_Add_Product_To_Inventory()
    {
        // Arrange
        var productDto = new AddProductDto
        {
            Name = "Coca Cola Original taste - 1.5l",
            Code = "5449000000439",
            ExpirationDate = DateTime.Now.AddDays(1)
        };

        // Action
        var inventory = await _inventoryAppService.AddProductAsync(productDto);

        // Assert
        inventory.Products.ShouldNotBeEmpty();
        inventory.Products.Count.ShouldBe(1);
    }

    [Fact]
    public async Task AddProductAsync_Should_Add_Multiple_Products_To_Inventory()
    {
        // Arrange
        const int productCount = 10;

        for (var i = 0; i < productCount; i++)
        {
            var productDto = new AddProductDto
            {
                Name = "Coca Cola Original taste - 1.5l",
                Code = "5449000000439",
                ExpirationDate = DateTime.Now.AddDays(1)
            };

            await _inventoryAppService.AddProductAsync(productDto);
        }

        // Action
        var inventory = await _inventoryAppService.GetAsync();

        // Assert
        inventory.Products.ShouldNotBeEmpty();
        inventory.Products.Count.ShouldBe(productCount);
    }

    [Fact]
    public async Task ClearAsync_Should_Remove_All_Products_From_Inventory()
    {
        // Arrange
        var productDto = new AddProductDto
        {
            Name = "Coca Cola Original taste - 1.5l",
            Code = "5449000000439",
            ExpirationDate = DateTime.Now.AddDays(1)
        };

        var inventory = await _inventoryAppService.AddProductAsync(productDto);

        inventory.Products.Count.ShouldBe(1);
        var product = inventory.Products.First();

        product.Name.ShouldBe(productDto.Name);
        product.Code.ShouldBe(productDto.Code);
        product.ExpirationDate.ShouldBe(productDto.ExpirationDate.ClearTime());

        // Action
        inventory = await _inventoryAppService.ClearAsync();

        // Assert
        inventory.Products.ShouldBeEmpty();
    }

    [Fact]
    public async Task RemoveProductAsync_Should_Remove_Specific_Product_From_Inventory()
    {
        // Arrange
        var productDto = new AddProductDto
        {
            Name = "Coca Cola Original taste - 1.5l",
            Code = "5449000000439",
            ExpirationDate = DateTime.Now.AddDays(1)
        };

        await _inventoryAppService.AddProductAsync(productDto);
        var inventory = await _inventoryAppService.AddProductAsync(productDto);

        inventory.Products.Count.ShouldBe(2);

        var removeProductDto = new RemoveProductDto
        {
            Id = inventory.Products.Last().Id
        };

        // Action
        inventory = await _inventoryAppService.RemoveProductAsync(removeProductDto);

        // Assert
        inventory.Products.ShouldNotContain(p => p.Id == removeProductDto.Id);
        inventory.Products.Count.ShouldBe(1);
    }
}