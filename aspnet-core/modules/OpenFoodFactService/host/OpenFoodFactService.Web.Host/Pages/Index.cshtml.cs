using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;

namespace OpenFoodFactService.Pages;

public class IndexModel : OpenFoodFactServicePageModel
{
    public void OnGet()
    {

    }

    public async Task OnPostLoginAsync()
    {
        await HttpContext.ChallengeAsync("oidc");
    }
}
