using System.Threading.Tasks;
using Aled.Products.Dtos;
using Volo.Abp.Application.Services;

namespace Aled.Products;

public interface IProductAppService : IApplicationService
{
    Task<ProductDetailsDto> GetAsync(string code);
}