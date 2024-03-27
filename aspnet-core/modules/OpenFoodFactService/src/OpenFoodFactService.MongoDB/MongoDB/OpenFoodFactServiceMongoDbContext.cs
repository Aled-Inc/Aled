using Volo.Abp.Data;
using Volo.Abp.MongoDB;

namespace OpenFoodFactService.MongoDB;

[ConnectionStringName(OpenFoodFactServiceDbProperties.ConnectionStringName)]
public class OpenFoodFactServiceMongoDbContext : AbpMongoDbContext, IOpenFoodFactServiceMongoDbContext
{
    /* Add mongo collections here. Example:
     * public IMongoCollection<Question> Questions => Collection<Question>();
     */

    protected override void CreateModel(IMongoModelBuilder modelBuilder)
    {
        base.CreateModel(modelBuilder);

        modelBuilder.ConfigureOpenFoodFactService();
    }
}
