using Lasmart.DriverRecords.Domain.Entities;
using Lasmart.DriverRecords.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Lasmart.DriverRecords.Infrastructure.Persistence;

public static class DbInitializer
{
    public static async Task InitializeAsync(DriverRecordsDbContext dbContext, CancellationToken cancellationToken)
    {
        await dbContext.Database.EnsureCreatedAsync(cancellationToken);

        if (await dbContext.DriverRecords.AnyAsync(cancellationToken))
        {
            return;
        }

        var nowUtc = DateTime.UtcNow;

        var records = new[]
        {
            new DriverRecord
            {
                Id = Guid.NewGuid(),
                FirstName = "Анна",
                LastName = "Соколова",
                MiddleName = "Игоревна",
                BirthYear = 1996,
                City = "Казань",
                DrivingCategory = DrivingCategory.B,
                IsTuitionPaid = true,
                CreatedAtUtc = nowUtc,
                UpdatedAtUtc = nowUtc
            },
            new DriverRecord
            {
                Id = Guid.NewGuid(),
                FirstName = "Илья",
                LastName = "Морозов",
                MiddleName = "Павлович",
                BirthYear = 1992,
                City = "Екатеринбург",
                DrivingCategory = DrivingCategory.C,
                IsTuitionPaid = false,
                CreatedAtUtc = nowUtc,
                UpdatedAtUtc = nowUtc
            },
            new DriverRecord
            {
                Id = Guid.NewGuid(),
                FirstName = "Мария",
                LastName = "Орлова",
                MiddleName = "Сергеевна",
                BirthYear = 2000,
                City = "Новосибирск",
                DrivingCategory = DrivingCategory.A,
                IsTuitionPaid = true,
                CreatedAtUtc = nowUtc,
                UpdatedAtUtc = nowUtc
            }
        };

        await dbContext.DriverRecords.AddRangeAsync(records, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
