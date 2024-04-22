using Aled.Samples;
using Xunit;

namespace Aled.EntityFrameworkCore.Domains;

[Collection(AledTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<AledEntityFrameworkCoreTestModule>
{
}