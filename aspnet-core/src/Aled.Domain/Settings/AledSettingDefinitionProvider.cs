using Volo.Abp.Settings;

namespace Aled.Settings;

public class AledSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(AledSettings.MySetting1));
    }
}