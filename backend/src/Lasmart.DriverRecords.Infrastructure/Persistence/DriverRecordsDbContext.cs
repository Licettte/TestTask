using Lasmart.DriverRecords.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Lasmart.DriverRecords.Infrastructure.Persistence;

public sealed class DriverRecordsDbContext : DbContext
{
    public DriverRecordsDbContext(DbContextOptions<DriverRecordsDbContext> options)
        : base(options)
    {
    }

    public DbSet<DriverRecord> DriverRecords => Set<DriverRecord>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var entity = modelBuilder.Entity<DriverRecord>();

        entity.ToTable("driver_records");

        entity.HasKey(record => record.Id);

        entity.Property(record => record.Id)
            .HasColumnName("id");

        entity.Property(record => record.FirstName)
            .HasColumnName("first_name")
            .HasMaxLength(50)
            .IsRequired();

        entity.Property(record => record.LastName)
            .HasColumnName("last_name")
            .HasMaxLength(50)
            .IsRequired();

        entity.Property(record => record.MiddleName)
            .HasColumnName("middle_name")
            .HasMaxLength(50)
            .IsRequired();

        entity.Property(record => record.BirthYear)
            .HasColumnName("birth_year")
            .IsRequired();

        entity.Property(record => record.City)
            .HasColumnName("city")
            .HasMaxLength(80)
            .IsRequired();

        entity.Property(record => record.DrivingCategory)
            .HasColumnName("driving_category")
            .HasConversion<string>()
            .HasMaxLength(10)
            .IsRequired();

        entity.Property(record => record.IsTuitionPaid)
            .HasColumnName("is_tuition_paid")
            .IsRequired();

        entity.Property(record => record.CreatedAtUtc)
            .HasColumnName("created_at_utc")
            .IsRequired();

        entity.Property(record => record.UpdatedAtUtc)
            .HasColumnName("updated_at_utc")
            .IsRequired();

        entity.HasIndex(record => new { record.LastName, record.FirstName });
    }
}
