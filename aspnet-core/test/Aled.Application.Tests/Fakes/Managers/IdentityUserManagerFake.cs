using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Volo.Abp.Caching;
using Volo.Abp.EventBus.Distributed;
using Volo.Abp.Identity;
using Volo.Abp.Security.Claims;
using Volo.Abp.Settings;
using Volo.Abp.Threading;

namespace Aled.Fakes.Managers;

public class IdentityUserManagerFake : IdentityUserManager
{
    public const string EmailToken = "email_provider_token";
    
    private bool _responseResult = true;
    private IdentityResult IdentityResult => _responseResult ? IdentityResult.Success : IdentityResult.Failed();
    
    public IdentityUserManagerFake(IdentityUserStore store, IIdentityRoleRepository roleRepository,
        IIdentityUserRepository userRepository, IOptions<IdentityOptions> optionsAccessor,
        IPasswordHasher<IdentityUser> passwordHasher, IEnumerable<IUserValidator<IdentityUser>> userValidators,
        IEnumerable<IPasswordValidator<IdentityUser>> passwordValidators, ILookupNormalizer keyNormalizer,
        IdentityErrorDescriber errors, IServiceProvider services, ILogger<IdentityUserManager> logger,
        ICancellationTokenProvider cancellationTokenProvider, IOrganizationUnitRepository organizationUnitRepository,
        ISettingProvider settingProvider, IDistributedEventBus distributedEventBus,
        IIdentityLinkUserRepository identityLinkUserRepository,
        IDistributedCache<AbpDynamicClaimCacheItem> dynamicClaimCache) : base(store, roleRepository, userRepository,
        optionsAccessor, passwordHasher, userValidators, passwordValidators, keyNormalizer, errors, services, logger,
        cancellationTokenProvider, organizationUnitRepository, settingProvider, distributedEventBus,
        identityLinkUserRepository, dynamicClaimCache)
    {
    }

    public override Task<string> GenerateUserTokenAsync(IdentityUser user, string tokenProvider, string purpose)
    {
        return Task.FromResult(EmailToken);
    }

    public override Task<bool> VerifyUserTokenAsync(IdentityUser user, string tokenProvider, string purpose, string token)
    {
        return Task.FromResult(_responseResult);
    }

    public override Task<IdentityResult> UpdateAsync(IdentityUser user)
    {
        return Task.FromResult(IdentityResult);
    }

    public override Task<IdentityResult> DeleteAsync(IdentityUser user)
    {
        return !_responseResult ? Task.FromResult(IdentityResult) : base.DeleteAsync(user);
    }

    public void SetResponseToBe(bool responseResult)
    {
        _responseResult = responseResult;
    }
}