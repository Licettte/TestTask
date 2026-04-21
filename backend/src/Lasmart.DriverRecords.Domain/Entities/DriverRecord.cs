using Lasmart.DriverRecords.Domain.Enums;

namespace Lasmart.DriverRecords.Domain.Entities;

public sealed class DriverRecord
{
    public Guid Id { get; set; }

    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    public string MiddleName { get; set; } = string.Empty;

    public int BirthYear { get; set; }

    public string City { get; set; } = string.Empty;

    public DrivingCategory DrivingCategory { get; set; }

    public bool IsTuitionPaid { get; set; }

    public DateTime CreatedAtUtc { get; set; }

    public DateTime UpdatedAtUtc { get; set; }
}
