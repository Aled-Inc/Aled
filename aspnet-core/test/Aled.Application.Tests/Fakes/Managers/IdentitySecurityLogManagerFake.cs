using Microsoft.AspNetCore.Identity;
using Volo.Abp.Identity;
using Volo.Abp.Security.Claims;
using Volo.Abp.SecurityLog;
using Volo.Abp.Users;

namespace Aled.Fakes.Managers;

public class IdentitySecurityLogManagerFake : IdentitySecurityLogManager
{
    public IdentitySecurityLogManagerFake(ISecurityLogManager securityLogManager, IdentityUserManager userManager,
        ICurrentPrincipalAccessor currentPrincipalAccessor,
        IUserClaimsPrincipalFactory<IdentityUser> userClaimsPrincipalFactory, ICurrentUser currentUser) : base(
        securityLogManager, userManager, currentPrincipalAccessor, userClaimsPrincipalFactory, currentUser)
    {
    }
}