using System.Data;
using Dapper;
using Lasmart.DriverRecords.Application.Common.Exceptions;
using Lasmart.DriverRecords.Application.DriverRecords.Dtos;
using Lasmart.DriverRecords.Application.DriverRecords.Interfaces;
using Npgsql;

namespace Lasmart.DriverRecords.Infrastructure.Services;

public sealed class DriverRecordReadService : IDriverRecordReadService
{
    private readonly string _connectionString;

    public DriverRecordReadService(string connectionString)
    {
        _connectionString = connectionString;
    }

    public async Task<IReadOnlyCollection<DriverRecordDto>> GetAllAsync(string? search, CancellationToken cancellationToken)
    {
        const string baseSql = """
            SELECT
                id,
                first_name AS FirstName,
                last_name AS LastName,
                middle_name AS MiddleName,
                birth_year AS BirthYear,
                city AS City,
                driving_category AS DrivingCategory,
                is_tuition_paid AS IsTuitionPaid
            FROM driver_records
            WHERE
                @search IS NULL
                OR trim(@search) = ''
                OR lower(first_name) LIKE '%' || lower(@search) || '%'
                OR lower(last_name) LIKE '%' || lower(@search) || '%'
                OR lower(middle_name) LIKE '%' || lower(@search) || '%'
                OR lower(city) LIKE '%' || lower(@search) || '%'
            ORDER BY last_name, first_name, middle_name;
            """;

        await using var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync(cancellationToken);

        var records = await connection.QueryAsync<DriverRecordDto>(
            new CommandDefinition(
                baseSql,
                new { search },
                cancellationToken: cancellationToken));

        return records.ToArray();
    }

    public async Task<DriverRecordDto> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        const string sql = """
            SELECT
                id,
                first_name AS FirstName,
                last_name AS LastName,
                middle_name AS MiddleName,
                birth_year AS BirthYear,
                city AS City,
                driving_category AS DrivingCategory,
                is_tuition_paid AS IsTuitionPaid
            FROM driver_records
            WHERE id = @id;
            """;

        await using var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync(cancellationToken);

        var record = await connection.QuerySingleOrDefaultAsync<DriverRecordDto>(
            new CommandDefinition(
                sql,
                new { id },
                cancellationToken: cancellationToken));

        return record ?? throw new EntityNotFoundException("Запись не найдена.");
    }
}
