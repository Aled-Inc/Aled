using Xunit;

namespace Aled.EntityFrameworkCore;

[CollectionDefinition(AledTestConsts.CollectionDefinitionName)]
public class AledEntityFrameworkCoreCollection : ICollectionFixture<AledEntityFrameworkCoreFixture>
{
}