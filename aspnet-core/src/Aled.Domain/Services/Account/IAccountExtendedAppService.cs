using System.Threading.Tasks;
using Aled.IdentityUsers.Dtos;

namespace Aled.Services.Account;

public interface IAccountExtendedAppService
{
    Task<IdentityUserExtendedDto> GetInformation();
}