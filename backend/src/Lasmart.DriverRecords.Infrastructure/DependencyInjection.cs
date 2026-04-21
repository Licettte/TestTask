using Lasmart.DriverRecords.Application.DriverRecords.Interfaces;
using Lasmart.DriverRecords.Infrastructure.Persistence;
using Lasmart.DriverRecords.Infrastructure.Repositories;
using Lasmart.DriverRecords.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Lasmart.DriverRecords.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("Postgres")
            ?? throw new InvalidOperationException("Connection string 'Postgres' was not found.");

        services.AddDbContext<DriverRecordsDbContext>(options =>
            options.UseNpgsql(connectionString));

        services.AddScoped<IDriverRecordRepository, DriverRecordRepository>();
        services.AddScoped<IDriverRecordWriteService, DriverRecordWriteService>();
        services.AddScoped<IDriverRecordReadService>(_ => new DriverRecordReadService(connectionString));

        return services;
    }
}
