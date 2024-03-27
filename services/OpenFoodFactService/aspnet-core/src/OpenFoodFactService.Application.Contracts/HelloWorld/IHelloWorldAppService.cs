using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace OpenFoodFactService.HelloWorld;

public interface IHelloWorldAppService : IApplicationService
{
    Task<string> GetHelloWorldAsync();
}