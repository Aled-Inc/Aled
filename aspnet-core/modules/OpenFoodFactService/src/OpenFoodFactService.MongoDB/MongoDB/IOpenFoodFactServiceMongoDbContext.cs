using Volo.Abp.Data;
using Volo.Abp.MongoDB;

namespace OpenFoodFactService.MongoDB;

[ConnectionStringName(OpenFoodFactServiceDbProperties.ConnectionStringName)]
public interface IOpenFoodFactServiceMongoDbContext : IAbpMongoDbContext
{
    /* Define mongo collections here. Example:
     * IMongoCollection<Question> Questions { get; }
     */
}
