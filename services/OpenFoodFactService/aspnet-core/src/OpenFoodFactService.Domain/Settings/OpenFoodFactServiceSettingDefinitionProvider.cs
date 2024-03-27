using Volo.Abp.Settings;

namespace OpenFoodFactService.Settings;

public class OpenFoodFactServiceSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(OpenFoodFactServiceSettings.MySetting1));
    }
}
