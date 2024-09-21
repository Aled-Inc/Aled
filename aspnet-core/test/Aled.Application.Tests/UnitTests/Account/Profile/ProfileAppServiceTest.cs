using System;
using System.Threading;
using System.Threading.Tasks;
using Aled.Account.Profile;
using Aled.Fakes.Managers;
using Moq;
using Shouldly;
using Volo.Abp.Identity;
using Volo.Abp.Uow;
using Xunit;

namespace Aled.UnitTests.Account.Profile;

public sealed class ProfileAppServiceTest : AledApplicationTestBase<AledApplicationTestModule>
{
    private readonly ProfileAppService _profileAppService;
    private readonly Mock<IUnitOfWork> _unitOfWorkMock;
    private readonly IdentityUserManagerFake? _userManagerFake;

    public ProfileAppServiceTest()
    {
        _profileAppService = GetRequiredService<ProfileAppService>();
        _unitOfWorkMock = GetRequiredService<Mock<IUnitOfWork>>();
        _userManagerFake = GetRequiredService<IdentityUserManager>() as IdentityUserManagerFake;
        
        var unitOfWorkManagerFake = GetRequiredService<IUnitOfWorkManager>() as UnitOfWorkManagerFake;
        unitOfWorkManagerFake?.SetUnitOfWork(_unitOfWorkMock.Object);
    }

    [Fact]
    public async Task DisableAsync_ShouldSetUserInactive_AndSaveChanges()
    {
        await InitFixtureAsync();

        await _profileAppService.DisableAsync();

        User.IsActive.ShouldBeFalse();
        _unitOfWorkMock.Verify(u => u.SaveChangesAsync(CancellationToken.None), Times.Once); 
    }

    [Fact]
    public async Task DisableAsync_ShouldThrowException_WhenUpdateFails()
    {
        await InitFixtureAsync();
    
        _userManagerFake?.SetResponseToBe(false);
    
        await Assert.ThrowsAsync<InvalidOperationException>(async () => await _profileAppService.DisableAsync());
    }
    
    [Fact]
    public async Task DeleteAsync_ShouldDeleteUser()
    {
        await InitFixtureAsync();
        
        IdentityUser? user = await UserRepository?.FindAsync(User.Id)!;
        
        user?.Id.ShouldBe(User.Id);
    
        await _profileAppService.DeleteAsync();
    
        user = await UserRepository?.FindAsync(User.Id)!;
        user.ShouldBeNull();
    }
    
    [Fact]
    public async Task DeleteAsync_ShouldThrowException_WhenDeleteFails()
    {
        await InitFixtureAsync();
        
        _userManagerFake?.SetResponseToBe(false);
        
        await Assert.ThrowsAsync<InvalidOperationException>(async () => await _profileAppService.DeleteAsync());
    }
}