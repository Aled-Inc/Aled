using System;
using System.Threading.Tasks;
using Aled.IdentityUsers.Dtos;
using Microsoft.AspNetCore.Identity;

namespace Aled.Services.Account;

public interface IAccountExtendedAppService
{
    Task<IdentityUserExtendedDto> GetInformation();
    Task<string> GenerateEmailConfirmationToken(Guid userId);
    Task<IdentityResult> ConfirmEmailAsync(Guid userId, string token);
}