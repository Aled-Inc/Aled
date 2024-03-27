using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace OpenFoodFactService.EntityFrameworkCore;

public class OpenFoodFactServiceHttpApiHostMigrationsDbContextFactory : IDesignTimeDbContextFactory<OpenFoodFactServiceHttpApiHostMigrationsDbContext>
{
    public OpenFoodFactServiceHttpApiHostMigrationsDbContext CreateDbContext(string[] args)
    {
        var configuration = BuildConfiguration();

        var builder = new DbContextOptionsBuilder<OpenFoodFactServiceHttpApiHostMigrationsDbContext>()
            .UseSqlServer(configuration.GetConnectionString("OpenFoodFactService"));

        return new OpenFoodFactServiceHttpApiHostMigrationsDbContext(builder.Options);
    }

    private static IConfigurationRoot BuildConfiguration()
    {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false);

        return builder.Build();
    }
}
