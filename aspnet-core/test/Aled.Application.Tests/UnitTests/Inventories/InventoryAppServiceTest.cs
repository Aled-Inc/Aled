﻿using System;
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
using Aled.Repositories.Products;
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
    private readonly InMemoryProductRepository? _productRepository;
    private readonly InMemoryInventoryBasicRepository? _inventoryBasicRepository;
    private readonly IMapper _mapper;

    private readonly Inventory _inventory = new(User);

    private readonly List<Product> _products =
    [
        new Product
        {
            Code = "1234567891000"
        },

        new Product
        {
            Code = "1234567891010"
        },

        new Product
        {
            Code = "1234567891020"
        },

        new Product
        {
            Code = "1234567891030"
        }

    ];

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
        _inventoryBasicRepository = GetRequiredService<IInventoryRepository>() as InMemoryInventoryBasicRepository;
        _productRepository = GetRequiredService<IProductRepository>() as InMemoryProductRepository;
        _mapper = GetRequiredService<IMapper>();
    }

    protected override async Task InitFixtureAsync()
    {
        await base.InitFixtureAsync();

        foreach (Product product in _products)
        {
            product.SetInventory(_inventory);
            _inventory.AddProduct(product);
        }
        
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
    
    [Fact]
    public async Task GetDetailsAsync_ShouldReturnMappedInventoryDetailsDto()
    {
        await InitFixtureAsync();
        var expectedInventoryDetailsDto = _mapper.Map<Inventory, InventoryDetailsDto>(_inventory);
    
        var result = await _inventoryAppService.GetDetailsAsync();
    
        result.ShouldNotBeNull();
        result.ShouldBeEquivalentTo(expectedInventoryDetailsDto);
    }

    [Fact]
    public async Task GetProductsAsync_ShouldReturnPagedResultDtoWithMappedProducts()
    {
        await InitFixtureAsync();
        await _productRepository?.InsertManyAsync(_inventory.Products)!;
        var getProductsDto = new GetProductsDto
        {
            Sorting = string.Empty,
            MaxResultCount = 10,
            SkipCount = 0,
            Filter = null
        };

        var productList = _inventory.Products;
        var totalCount = productList.Count;
        var expectedProductDtos = _mapper.Map<List<Product>, List<ProductDto>>(productList.ToList());

        var result = await _inventoryAppService.GetProductsAsync(getProductsDto);

        result.ShouldNotBeNull();
        result.TotalCount.ShouldBe(totalCount);
        result.Items.ShouldBeEquivalentTo(expectedProductDtos);
    }

}