using Volo.Abp.Application.Dtos;

namespace Aled.Products.Dtos;

public class GetProductsDto : PagedAndSortedResultRequestDto
{
    public string? Filter { get; set; }
}