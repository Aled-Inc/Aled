using System;
using System.Threading.Tasks;
using Aled.Fakes.Repositories;
using Aled.Security;
using Volo.Abp.Identity;
using Volo.Abp.Modularity;
using Volo.Abp.Security.Claims;

namespace Aled;

public class AledApplicationTestBase<TStartupModule> : AledTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{
    protected readonly IIdentityUserRepository? UserRepository;
    
    private readonly IIdentityLinkUserRepository? _userLinkRepository;
    private readonly FakeCurrentPrincipalAccessor? _currentPrincipalAccessor;

    protected AledApplicationTestBase()
    {
        UserRepository = GetRequiredService<IIdentityUserRepository>() as InMemoryIdentityUserRepository;
        _currentPrincipalAccessor = GetRequiredService<ICurrentPrincipalAccessor>() as FakeCurrentPrincipalAccessor;
        _userLinkRepository = GetRequiredService<IIdentityLinkUserRepository>();
    }

    protected static readonly IdentityUser User = new (Guid.NewGuid(), "TestUser", "testuser@gmail.com");
    protected static readonly IdentityUserDto UserDto = new() {Id = User.Id, Email = User.Email, UserName = User.UserName};
    private static readonly IdentityLinkUserInfo _linkUserInfo = new(User.Id, User.TenantId);
    private readonly IdentityLinkUser _linkUser = new(Guid.NewGuid(), _linkUserInfo, _linkUserInfo);

    protected virtual async Task InitFixtureAsync()
    {
        await UserRepository?.InsertAsync(User)!;
        await _userLinkRepository?.InsertAsync(_linkUser)!;
        
        _currentPrincipalAccessor?.Change(User.Id.ToString(), User.UserName, User.Email);
    }
}