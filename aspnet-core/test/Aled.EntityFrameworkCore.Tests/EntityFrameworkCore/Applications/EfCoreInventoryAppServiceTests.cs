using Aled.Inventories;
using Xunit;

namespace Aled.EntityFrameworkCore.Applications;

[Collection(AledTestConsts.CollectionDefinitionName)]
public class EfCoreInventoryAppServiceTests : InventoryAppServiceTests<AledEntityFrameworkCoreTestModule>
{
}