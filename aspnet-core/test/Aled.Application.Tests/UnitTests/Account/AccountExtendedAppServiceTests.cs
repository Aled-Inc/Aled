using System;
using System.Text;
using System.Threading.Tasks;
using Aled.Account;
using Aled.Fakes.Managers;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Shouldly;
using Volo.Abp.Domain.Entities;
using Xunit;

namespace Aled.UnitTests.Account;

public class AccountExtendedAppServiceTests : AledApplicationTestBase<AledApplicationTestModule>
{
    private readonly AccountExtendedAppService _accountService;

    public AccountExtendedAppServiceTests() : base ()
    {
        _accountService = GetRequiredService<AccountExtendedAppService>();
    }

    [Fact]
    public async Task GetInformation_ShouldReturnUserInformation()
    {
        await InitFixtureAsync();
        
        var result = await _accountService.GetInformation();

        Assert.NotNull(result);
        Assert.Equal(User.Id, result.Id);
    }
    
    [Fact]
    public async Task GenerateEmailConfirmationToken_ShouldReturnEncodedToken()
    {
        await InitFixtureAsync();
        
        var encodedToken = Base64UrlEncoder.Encode(Encoding.UTF8.GetBytes(IdentityUserManagerFake.EmailToken));
    
        var result = await _accountService.GenerateEmailConfirmationToken(User.Id);
    
        result.ShouldBe(encodedToken);
    }
    
    [Fact]
    public async Task ConfirmEmailAsync_ShouldReturnSuccess_WhenTokenIsValid()
    {
        await InitFixtureAsync();
        var encodedToken = Base64UrlEncoder.Encode(Encoding.UTF8.GetBytes(IdentityUserManagerFake.EmailToken));
    
        var result = await _accountService.ConfirmEmailAsync(User.Id, encodedToken);
    
        result.ShouldBe(IdentityResult.Success);
    }
    
    [Fact]
    public async Task ConfirmEmailAsync_ShouldThrowKeyNotFoundException_WhenUserNotFound()
    {
        await InitFixtureAsync();
        
        var encodedToken = Base64UrlEncoder.Encode(Encoding.UTF8.GetBytes(IdentityUserManagerFake.EmailToken));
    
        await Assert.ThrowsAsync<EntityNotFoundException>(() => _accountService.ConfirmEmailAsync(Guid.NewGuid(), encodedToken));
    }
    
    [Fact]
    public async Task GenerateEmailConfirmationToken_ShouldThrowEntityNotFoundException_WhenUserNotFound()
    {
        var nonExistentUserId = Guid.NewGuid();

        await Assert.ThrowsAsync<EntityNotFoundException>(() => _accountService.GenerateEmailConfirmationToken(nonExistentUserId));
    }
}