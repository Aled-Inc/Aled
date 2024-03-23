using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace Aled.Data;

/* This is used if database provider does't define
 * IAledDbSchemaMigrator implementation.
 */
public class NullAledDbSchemaMigrator : IAledDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
