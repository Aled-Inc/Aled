using System.Threading.Tasks;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using Volo.Abp.Account;
using Volo.Abp.DependencyInjection;
using IProfileAppService = Aled.Services.Account.Profile.IProfileAppService;

namespace Aled.Controllers.Account.Profile;

[Dependency(ReplaceServices = true)]
[RemoteService(Name = AccountRemoteServiceConsts.RemoteServiceName)]
[Area(AccountRemoteServiceConsts.ModuleName)]
[ControllerName("Profile")]
[Route("/api/account/my-profile")]
public class ProfileExtendedController(IProfileAppService profileAppService) : IProfileAppService
{
    [HttpPost]
    [Route("disable")]
    public Task DisableAsync()
    {
        return profileAppService.DisableAsync();
    }
    
    [HttpDelete]
    [Route("delete")]
    public Task DeleteAsync()
    {
        return profileAppService.DeleteAsync();
    }
}