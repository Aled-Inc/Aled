using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace OpenFoodFactService.HelloWorld;

public class HelloWorldAppService : ApplicationService, IHelloWorldAppService
{
    public Task<string> GetHelloWorldAsync()
    {
        return Task.FromResult("Hello World from OpenFoodFactService!");
    }
}