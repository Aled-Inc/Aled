using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Aled.IdentityUsers.Dtos;
using Aled.Services.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Volo.Abp.Account;
using Volo.Abp.Account.Emailing;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Identity;
using Volo.Abp.Users;

namespace Aled.Account;

[ExposeServices([typeof(IAccountExtendedAppService), typeof(AccountExtendedAppService)], IncludeSelf = true)]
public class AccountExtendedAppService(
    IdentityUserManager userManager,
    IIdentityRoleRepository roleRepository,
    IAccountEmailer accountEmailer,
    IdentitySecurityLogManager identitySecurityLogManager,
    IOptions<IdentityOptions> identityOptions)
    : AccountAppService(userManager, roleRepository, accountEmailer, identitySecurityLogManager, identityOptions),
        IAccountExtendedAppService
{
    [Authorize]
    public async Task<IdentityUserExtendedDto> GetInformation()
    {
        var currentUser = await UserManager.GetByIdAsync(CurrentUser.GetId());

        return ObjectMapper.Map<IdentityUser, IdentityUserExtendedDto>(currentUser);
    }

    public async Task<string> GenerateEmailConfirmationToken(Guid userId)
    {
        var currentUser = await UserManager.GetByIdAsync(userId);

        var code = await UserManager.GenerateEmailConfirmationTokenAsync(currentUser);
        code = Base64UrlEncoder.Encode(Encoding.UTF8.GetBytes(code));

        return code;
    }

    public async Task<IdentityResult> ConfirmEmailAsync(Guid userId, string token)
    {
        var user = await UserManager.GetByIdAsync(userId);

        if (user == null)
        {
            throw new KeyNotFoundException();
        }

        token = Encoding.UTF8.GetString(Base64UrlEncoder.DecodeBytes(token));
        return await UserManager.ConfirmEmailAsync(user, token);
    }
}