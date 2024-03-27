using Microsoft.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace OpenFoodFactService.EntityFrameworkCore;

public class OpenFoodFactServiceHttpApiHostMigrationsDbContext : AbpDbContext<OpenFoodFactServiceHttpApiHostMigrationsDbContext>
{
    public OpenFoodFactServiceHttpApiHostMigrationsDbContext(DbContextOptions<OpenFoodFactServiceHttpApiHostMigrationsDbContext> options)
        : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ConfigureOpenFoodFactService();
    }
}
