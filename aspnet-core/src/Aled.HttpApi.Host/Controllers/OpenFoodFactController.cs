using System.Threading.Tasks;
using Aled.OpenFoodFactService;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp.AspNetCore.Mvc;

namespace Aled.Controllers;

public class OpenFoodFactController : AbpController
{
    private readonly IHealthCheckAppService _healthCheckAppService;

    public OpenFoodFactController(IHealthCheckAppService healthCheckAppService)
    {
        _healthCheckAppService = healthCheckAppService;
    }

    [HttpGet("api/openfoodfact/health-check")]
    public async Task<IActionResult> GetHealthCheck()
    {
        return Ok(await _healthCheckAppService.GetStatusAsync());
    } 
}