using System.Threading.Tasks;
using Aled.Services.Account.Profile;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Identity;
using Volo.Abp.Users;

namespace Aled.Account.Profile;

[Authorize]
[ExposeServices([typeof(IProfileAppService), typeof(ProfileAppService)], IncludeSelf = true)]
public class ProfileAppService(IdentityUserManager userManager) : IdentityAppServiceBase, IProfileAppService
{
    private IdentityUserManager UserManager { get; } = userManager;

    public async Task DisableAsync()
    {
        var currentUser = await UserManager.GetByIdAsync(CurrentUser.GetId());

        currentUser.SetIsActive(false);

        (await UserManager.UpdateAsync(currentUser)).CheckErrors();

        await CurrentUnitOfWork!.SaveChangesAsync();
    }

    public async Task DeleteAsync()
    {
        var currentUser = await UserManager.GetByIdAsync(CurrentUser.GetId());

        (await UserManager.DeleteAsync(currentUser)).CheckErrors();
    }
}