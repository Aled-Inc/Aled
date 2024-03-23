using Aled.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace Aled.Permissions;

public class AledPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(AledPermissions.GroupName);
        //Define your own permissions here. Example:
        //myGroup.AddPermission(AledPermissions.MyPermission1, L("Permission:MyPermission1"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<AledResource>(name);
    }
}