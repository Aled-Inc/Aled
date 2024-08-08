using System.Threading.Tasks;
using Aled.Emailing;
using Aled.Emailing.Models;
using Aled.Localization;
using Aled.Services.Email;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Localization;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Emailing;
using Volo.Abp.Identity;
using Volo.Abp.TextTemplating;
using Volo.Abp.Users;

namespace Aled.Email;

public class EmailService(
    IEmailSender emailSender,
    ITemplateRenderer templateRenderer,
    IStringLocalizer<AledResource> localizer,
    IConfiguration configuration,
    IHostEnvironment environment)
    : IEmailService, ITransientDependency
{
    private const string EmailConfirmationEndpoint =
        "/api/account/email-confirmation";

    public async Task SendEmailConfirmationEmailAsync(IdentityUserDto user, string code)
    {
        var userEmail = user.Email;

        if (environment.IsDevelopment())
        {
            userEmail = configuration.GetSection("Email:Default").Value!;
        }

        var body = await templateRenderer.RenderAsync(AledEmailTemplates.EmailConfirmationTemplate,
            new EmailConfirmationModel(user.UserName,
                $"{configuration.GetSection("Ngrok:Api.Host.Url").Value}{EmailConfirmationEndpoint}?token={code}&userId={user.Id}"));

        await emailSender.SendAsync(userEmail, localizer["Email:ConfirmEmailTitle"], body, true);
    }

    public async Task SendEmailConfirmationEmailAsync(ICurrentUser user, string code)
    {
        var userEmail = user.Email;

        if (environment.IsDevelopment())
        {
            userEmail = configuration.GetSection("Email:Default").Value!;
        }

        var body = await templateRenderer.RenderAsync(AledEmailTemplates.EmailConfirmationTemplate,
            new EmailConfirmationModel(user.UserName!,
                $"{configuration.GetSection("Ngrok:Api.Host.Url").Value}{EmailConfirmationEndpoint}?token={code}&userId={user.Id}"));

        await emailSender.SendAsync(userEmail!, localizer["Email:ConfirmEmailTitle"], body, true);
    }
}