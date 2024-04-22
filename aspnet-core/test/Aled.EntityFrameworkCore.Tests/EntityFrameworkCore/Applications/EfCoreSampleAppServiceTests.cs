using Aled.Samples;
using Xunit;

namespace Aled.EntityFrameworkCore.Applications;

[Collection(AledTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<AledEntityFrameworkCoreTestModule>
{
}