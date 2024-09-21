using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Aled.AggregateRoots.Inventories;
using Aled.Entities.Products;
using Aled.Fakes;
using Aled.Fakes.Repositories;
using Aled.Fakes.Services;
using Aled.Inventories;
using Aled.Inventories.Dtos;
using Aled.OpenFoodFactService.Products;
using Aled.Products.Dtos;
using Aled.Repositories.Inventories;
using AutoMapper;
using Shouldly;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories;
using Xunit;

namespace Aled.UnitTests.Inventories;

public sealed class InventoryAppServiceTest : AledApplicationTestBase<AledApplicationTestModule>
{
    private readonly InventoryAppService _inventoryAppService;
    private readonly ProductProxyAppServiceFake? _productProxyAppServiceFake;
    private readonly IRepository<Product, Guid>? _productRepository;
    private readonly InventoryBasicRepositoryFake? _inventoryBasicRepository;
    private readonly IMapper _mapper;

    private readonly Inventory _inventory = new(User)
    {
        Products = new List<Product>
        {
            new()
            {
                Code = "1"
            },
            new()
            {
                Code = "12"
            },
            new()
            {
                Code = "123"
            },
            new()
            {
                Code = "1234"
            },
        }
    };

    private static readonly Product Product = new()
    {
        Code = "1234567891011",
        AddedDate = DateTime.Today,
    };

    private readonly ProductScannedDto _productScannedDto = new()
    {
        Code = Product.Code
    };

    private readonly ProductScannedDto _invalidProductScannedDto = new()
    {
        Code = Guid.NewGuid().ToString()
    };

    private readonly RemoveProductDto _removeProductDto = new()
    {
        ProductId = Product.Id.ToString()
    };

    public InventoryAppServiceTest()
    {
        _inventoryAppService = GetRequiredService<InventoryAppService>();
        _productProxyAppServiceFake = GetRequiredService<IProductAppService>() as ProductProxyAppServiceFake;
        _inventoryBasicRepository = GetRequiredService<IInventoryRepository>() as InventoryBasicRepositoryFake;
        _productRepository = GetRequiredService<IRepository<Product, Guid>>() as InMemoryRepository<Product, Guid>;
        _mapper = GetRequiredService<IMapper>();
    }

    protected override async Task InitFixtureAsync()
    {
        await base.InitFixtureAsync();
        await _inventoryBasicRepository?.InsertAsync(_inventory)!;
    }

    [Fact]
    public async Task GetAsync_ShouldReturnMappedInventoryDto()
    {
        await InitFixtureAsync();

        var result = await _inventoryAppService.GetAsync();
        var inventoryDto = _mapper.Map<Inventory, InventoryDto>(_inventory);

        result.ShouldNotBeNull();
        result.ShouldBeEquivalentTo(inventoryDto);
    }

    [Fact]
    public async Task ClearAsync_ShouldReturnMappedInventoryDto()
    {
        await InitFixtureAsync();

        var result = await _inventoryAppService.ClearAsync();
        var userInventory = await _inventoryBasicRepository?.GetAsync(i => i.UserId == User.Id)!;

        result.ShouldNotBeNull();
        result.Products.ShouldNotBeNull();
        result.Products.ShouldBeEmpty();

        userInventory.ShouldNotBeNull();
        userInventory.Products.ShouldNotBeNull();
        userInventory.Products.ShouldBeEmpty();
    }

    [Fact]
    public async Task AddProductAsync_ShouldReturnMappedProductDto()
    {
        await InitFixtureAsync();
        await _productProxyAppServiceFake?.InsertAsync(Product)!;

        var result = await _inventoryAppService.AddProductAsync(_productScannedDto);

        result.ShouldNotBeNull();

        var userInventory = await _inventoryBasicRepository?.GetAsync(i => i.UserId == User.Id)!;
        var addedProduct = userInventory.Products.Single(p => p.Code == _productScannedDto.Code);
        var addedProductDto = _mapper.Map<Product, ProductDto>(addedProduct);

        addedProduct.ShouldNotBeNull();
        addedProductDto.ShouldBeEquivalentTo(result);

        var productFromProductRepository = await _productRepository?.FindAsync(p => p.Code == Product.Code)!;
        productFromProductRepository.ShouldNotBeNull();
        productFromProductRepository.ShouldBeEquivalentTo(addedProduct);
    }

    [Fact]
    public async Task AddProductAsync_WithWrongProductCode_ShouldThrowEntityNotFoundException()
    {
        await InitFixtureAsync();
        var initialProductRepoCount = await _productRepository!.CountAsync();
        var initialUserInventory =
            (await _inventoryBasicRepository?.GetAsync(i => i.UserId == User.Id)!).Products.Count;

        await Assert.ThrowsAsync<EntityNotFoundException>(() =>
            _inventoryAppService.AddProductAsync(_invalidProductScannedDto));

        var productRepoCount = await _productRepository!.CountAsync();
        var userInventoryCount = (await _inventoryBasicRepository.GetAsync(i => i.UserId == User.Id)).Products.Count;

        initialProductRepoCount.ShouldBe(productRepoCount);
        initialUserInventory.ShouldBe(userInventoryCount);
    }

    [Fact]
    public async Task RemoveProductAsync_ShouldReturnMappedInventoryDto()
    {
        await InitFixtureAsync();
        await _productRepository?.InsertAsync(Product)!;

        var result = await _inventoryAppService.RemoveProductAsync(_removeProductDto);

        result.ShouldNotBeNull();
        result.Products.ShouldNotBeNull();

        var product = result.Products.ToList().Find(p => p.Code == Product.Code);
        product.ShouldBeNull();

        var userInventory = await _inventoryBasicRepository?.GetAsync(i => i.UserId == User.Id)!;
        var inventoryProduct = userInventory.Products.ToList().Find(p => p.Code == Product.Code);
        inventoryProduct.ShouldBeNull();

        var productRepository = await _productRepository.FindAsync(p => p.Code == Product.Code);
        productRepository.ShouldBeNull();
    }
}