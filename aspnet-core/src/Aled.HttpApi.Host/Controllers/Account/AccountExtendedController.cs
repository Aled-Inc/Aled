using System;
using System.Threading.Tasks;
using Aled.IdentityUsers.Dtos;
using Aled.Services.Account;
using Aled.Services.Email;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Volo.Abp;
using Volo.Abp.Account;
using Volo.Abp.AspNetCore.Controllers;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Identity;
using Volo.Abp.Users;

namespace Aled.Controllers.Account;

[Dependency(ReplaceServices = true)]
[ReplaceControllers(typeof(AccountController))]
[RemoteService(Name = AccountRemoteServiceConsts.RemoteServiceName)]
[Area(AccountRemoteServiceConsts.ModuleName)]
[ControllerName("Account")]
[Route("api/account")]
public class AccountExtendedController(
    IAccountAppService accountAppService,
    IAccountExtendedAppService accountExtendedAppService,
    IEmailService emailService,
    IConfiguration configuration)
    : AccountController(accountAppService)
{
    [HttpGet]
    [Route("information")]
    public Task<IdentityUserExtendedDto> GetInformation()
    {
        return accountExtendedAppService.GetInformation();
    }

    [HttpGet]
    [Route("email-confirmation")]
    public async Task<IActionResult> EmailConfirmationAsync([FromQuery] string token, [FromQuery] Guid userId)
    {
        if (token.IsNullOrWhiteSpace() || token.IsNullOrWhiteSpace())
        {
            Redirect(configuration.GetSection("App:ClientUrl").Value!);
        }

        var result = await accountExtendedAppService.ConfirmEmailAsync(userId, token);
        var state = "failed";

        if (result.Succeeded)
        {
            state = "succeeded";
        }

        return Redirect($"{configuration.GetSection("App:ClientUrl").Value!}/--/email-confirmation/{state}");
    }

    [Authorize]
    [HttpPost]
    [Route("send-email-verification-code")]
    public async Task SendEmailConfirmationCode()
    {
        var code = await accountExtendedAppService.GenerateEmailConfirmationToken(CurrentUser.GetId());

        await emailService.SendEmailConfirmationEmailAsync(CurrentUser, code);
    }

    public override async Task<IdentityUserDto> RegisterAsync(RegisterDto input)
    {
        var user = await base.RegisterAsync(input);
        var code = await accountExtendedAppService.GenerateEmailConfirmationToken(user.Id);

        await emailService.SendEmailConfirmationEmailAsync(user, code);

        return user;
    }
}