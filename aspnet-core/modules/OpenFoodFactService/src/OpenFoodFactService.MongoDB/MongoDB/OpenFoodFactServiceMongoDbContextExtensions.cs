using Volo.Abp;
using Volo.Abp.MongoDB;

namespace OpenFoodFactService.MongoDB;

public static class OpenFoodFactServiceMongoDbContextExtensions
{
    public static void ConfigureOpenFoodFactService(
        this IMongoModelBuilder builder)
    {
        Check.NotNull(builder, nameof(builder));
    }
}
