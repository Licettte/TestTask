namespace Lasmart.DriverRecords.Application.DriverRecords.Dtos;

public sealed class CreateDriverRecordRequest
{
    public string FirstName { get; init; } = string.Empty;

    public string LastName { get; init; } = string.Empty;

    public string MiddleName { get; init; } = string.Empty;

    public int BirthYear { get; init; }

    public string City { get; init; } = string.Empty;

    public string DrivingCategory { get; init; } = string.Empty;

    public bool IsTuitionPaid { get; init; }
}
