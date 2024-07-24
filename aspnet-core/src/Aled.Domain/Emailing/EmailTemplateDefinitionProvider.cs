using Aled.Localization;
using Volo.Abp.Localization;
using Volo.Abp.TextTemplating;

namespace Aled.Emailing;

public class EmailTemplateDefinitionProvider : TemplateDefinitionProvider
{
    public override void Define(ITemplateDefinitionContext context)
    {
        context.Add(
            new TemplateDefinition(
                name: AledEmailTemplates.EmailLayout,
                displayName: LocalizableString.Create<AledResource>(
                    "TextTemplate:AledEmailTemplates.EmailLayout"),
                isLayout: true
            ).WithVirtualFilePath("/Emailing/Templates/EmailLayout.tpl", true));
        
        context.Add(
            new TemplateDefinition(
                name: AledEmailTemplates.EmailConfirmationTemplate,
                displayName: LocalizableString.Create<AledResource>(
                    "TextTemplate:AledEmailTemplates.EmailConfirmationTemplate"),
                layout: AledEmailTemplates.EmailLayout
            ).WithVirtualFilePath("/Emailing/Templates/EmailConfirmationTemplate.tpl", true));
    }
}