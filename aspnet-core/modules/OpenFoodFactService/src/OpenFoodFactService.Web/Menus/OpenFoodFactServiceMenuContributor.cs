using System.Threading.Tasks;
using Volo.Abp.UI.Navigation;

namespace OpenFoodFactService.Web.Menus;

public class OpenFoodFactServiceMenuContributor : IMenuContributor
{
    public async Task ConfigureMenuAsync(MenuConfigurationContext context)
    {
        if (context.Menu.Name == StandardMenus.Main)
        {
            await ConfigureMainMenuAsync(context);
        }
    }

    private Task ConfigureMainMenuAsync(MenuConfigurationContext context)
    {
        //Add main menu items.
        context.Menu.AddItem(new ApplicationMenuItem(OpenFoodFactServiceMenus.Prefix, displayName: "OpenFoodFactService", "~/OpenFoodFactService", icon: "fa fa-globe"));

        return Task.CompletedTask;
    }
}
