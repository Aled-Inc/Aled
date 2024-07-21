using System.Threading.Tasks;
using Aled.Services.Account.Profile;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using Volo.Abp.Account;
using Volo.Abp.DependencyInjection;
using IProfileAppService = Aled.Services.Account.Profile.IProfileAppService;

namespace Aled.Controllers;

[Dependency(ReplaceServices = true)]
// [ExposeServices(typeof(ProfileController), IncludeSelf = true)]
[RemoteService(Name = AccountRemoteServiceConsts.RemoteServiceName)]
[Area(AccountRemoteServiceConsts.ModuleName)]
[ControllerName("Profile")]
[Route("/api/account/my-profile")]
public class ProfileExtendedController(IProfileAppService profileAppService)
{
    private IProfileAppService ProfileAppService { get; } = profileAppService;

    [HttpPost]
    [Route("disable")]
    public virtual Task DisableAsync()
    {
        return ProfileAppService.DisableAsync();
    }
    
    [HttpDelete]
    [Route("delete")]
    public virtual Task DeleteAsync()
    {
        return ProfileAppService.DeleteAsync();
    }
}