using System.Threading.Tasks;
using Volo.Abp.Identity;
using Volo.Abp.Users;

namespace Aled.Services.Email;

public interface IEmailService
{
    Task SendEmailConfirmationEmailAsync(IdentityUserDto user, string code);
    Task SendEmailConfirmationEmailAsync(ICurrentUser user, string code);
}