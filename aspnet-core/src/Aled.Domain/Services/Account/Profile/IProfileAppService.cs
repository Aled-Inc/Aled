using System.Threading.Tasks;

namespace Aled.Services.Account.Profile;

public interface IProfileAppService
{
    Task DisableAsync();

    Task DeleteAsync();
}