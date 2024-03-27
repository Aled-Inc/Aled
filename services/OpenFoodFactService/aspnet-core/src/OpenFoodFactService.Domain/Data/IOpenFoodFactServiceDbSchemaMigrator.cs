using System.Threading.Tasks;

namespace OpenFoodFactService.Data;

public interface IOpenFoodFactServiceDbSchemaMigrator
{
    Task MigrateAsync();
}
