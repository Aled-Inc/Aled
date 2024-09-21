using System;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Security.Claims;
using Volo.Abp.Users;

namespace Aled.Security;

public class FakeCurrentUser : ICurrentUser
{
    private static readonly Claim[] EmptyClaimsArray = [];

    public virtual bool IsAuthenticated =>
        string.Equals(_principalAccessor.Principal.Claims.Single(_ => _.Type == ClaimTypes.Authentication).Value, "true", StringComparison.InvariantCultureIgnoreCase);

    public virtual Guid? Id => _principalAccessor.Principal?.FindUserId();

    public virtual string? UserName => this.FindClaimValue(AbpClaimTypes.UserName);

    public virtual string? Name => this.FindClaimValue(AbpClaimTypes.Name);

    public virtual string? SurName => this.FindClaimValue(AbpClaimTypes.SurName);

    public virtual string? PhoneNumber => this.FindClaimValue(AbpClaimTypes.PhoneNumber);

    public virtual bool PhoneNumberVerified => string.Equals(this.FindClaimValue(AbpClaimTypes.PhoneNumberVerified), "true", StringComparison.InvariantCultureIgnoreCase);

    public virtual string? Email => this.FindClaimValue(AbpClaimTypes.Email);

    public virtual bool EmailVerified => string.Equals(this.FindClaimValue(AbpClaimTypes.EmailVerified), "true", StringComparison.InvariantCultureIgnoreCase);

    public virtual Guid? TenantId => _principalAccessor.Principal?.FindTenantId();

    public virtual string[] Roles => FindClaims(AbpClaimTypes.Role).Select(c => c.Value).Distinct().ToArray();

    private readonly ICurrentPrincipalAccessor _principalAccessor;

    public FakeCurrentUser(ICurrentPrincipalAccessor principalAccessor)
    {
        _principalAccessor = principalAccessor;
    }

    public virtual Claim? FindClaim(string claimType)
    {
        return _principalAccessor.Principal?.Claims.FirstOrDefault(c => c.Type == claimType);
    }

    public virtual Claim[] FindClaims(string claimType)
    {
        return _principalAccessor.Principal?.Claims.Where(c => c.Type == claimType).ToArray() ?? EmptyClaimsArray;
    }

    public virtual Claim[] GetAllClaims()
    {
        return _principalAccessor.Principal?.Claims.ToArray() ?? EmptyClaimsArray;
    }

    public virtual bool IsInRole(string roleName)
    {
        return FindClaims(AbpClaimTypes.Role).Any(c => c.Value == roleName);
    }
}