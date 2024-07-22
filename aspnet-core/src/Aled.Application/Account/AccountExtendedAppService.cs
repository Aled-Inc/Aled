using System.Threading.Tasks;
using Aled.IdentityUsers.Dtos;
using Aled.Services.Account;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Identity;
using Volo.Abp.Users;

namespace Aled.Account;

[ExposeServices([typeof(IAccountExtendedAppService), typeof(AccountExtendedAppService)], IncludeSelf = true)]
public class AccountExtendedAppService(IdentityUserManager userManager) : IdentityAppServiceBase, IAccountExtendedAppService
{
    private IdentityUserManager UserManager { get; } = userManager;
    
    [Authorize]
    public async Task<IdentityUserExtendedDto> GetInformation()
    {
        var currentUser = await UserManager.GetByIdAsync(CurrentUser.GetId());

        return ObjectMapper.Map<IdentityUser, IdentityUserExtendedDto>(currentUser);
    }
}