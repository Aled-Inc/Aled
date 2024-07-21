using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace Aled.Services.Account.Profile;

public interface IProfileAppService
{
    Task DisableAsync();

    Task DeleteAsync();
}