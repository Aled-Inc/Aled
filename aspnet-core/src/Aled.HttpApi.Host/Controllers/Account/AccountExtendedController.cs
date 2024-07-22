using System.Threading.Tasks;
using Aled.IdentityUsers.Dtos;
using Aled.Services.Account;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using Volo.Abp.Account;
using Volo.Abp.DependencyInjection;

namespace Aled.Controllers.Account;

[Dependency(ReplaceServices = true)]
[RemoteService(Name = AccountRemoteServiceConsts.RemoteServiceName)]
[Area(AccountRemoteServiceConsts.ModuleName)]
[ControllerName("Account")]
[Route("api/account")]
public class AccountExtendedController(IAccountExtendedAppService accountExtendedAppService) : IAccountExtendedAppService
{
    [HttpGet]
    [Route("information")]
    public Task<IdentityUserExtendedDto> GetInformation()
    {
        return accountExtendedAppService.GetInformation();
    }
}