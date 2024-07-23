using Aled.Inventories;
using Xunit;

namespace Aled.EntityFrameworkCore.Domains;

[Collection(AledTestConsts.CollectionDefinitionName)]
public class EfCoreInventoryDomainTests : InventoryDomainTests<AledEntityFrameworkCoreTestModule>
{
}