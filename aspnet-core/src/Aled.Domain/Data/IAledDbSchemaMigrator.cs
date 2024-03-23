using System.Threading.Tasks;

namespace Aled.Data;

public interface IAledDbSchemaMigrator
{
    Task MigrateAsync();
}
