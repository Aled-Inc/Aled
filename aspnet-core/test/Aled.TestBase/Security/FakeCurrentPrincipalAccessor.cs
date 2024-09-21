using System.Collections.Generic;
using System.Net;
using System.Security.Claims;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Security.Claims;
using static System.String;

namespace Aled.Security;

[Dependency(ReplaceServices = true)]
public class FakeCurrentPrincipalAccessor : ThreadCurrentPrincipalAccessor
{
    private string _userId = Empty;
    private string _userName = Empty;
    private string _userEmail = Empty;
    private bool _isAuthenticated;

    public void Change(string userId, string userName, string email, bool isAuthenticated = false)
    {
        _userId = userId;
        _userName = userName;
        _userEmail = email;
        _isAuthenticated = isAuthenticated;
    }
    
    protected override ClaimsPrincipal GetClaimsPrincipal()
    {
        return GetPrincipal();
    }

    // private ClaimsPrincipal GetPrincipal()
    // {
    //     return new ClaimsPrincipal(new ClaimsIdentity(new List<Claim>
    //     {
    //         new(AbpClaimTypes.UserId, _userId),
    //         new(AbpClaimTypes.UserName, _userName),
    //         new(AbpClaimTypes.Email, _userEmail)
    //     }));
    // }
    
    private ClaimsPrincipal GetPrincipal()
    {
        var identity = new ClaimsIdentity(new List<Claim>
            {
                new(AbpClaimTypes.UserId, _userId),
                new(AbpClaimTypes.UserName, _userName),
                new(AbpClaimTypes.Email, _userEmail)
            }, 
            _isAuthenticated ? "TestAuthType" : null, null, null);

        identity.AddClaim(new Claim(ClaimTypes.Authentication, _isAuthenticated.ToString()));

        return new ClaimsPrincipal(identity);
    }
}