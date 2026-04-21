using Lasmart.DriverRecords.Application.DriverRecords.Dtos;

namespace Lasmart.DriverRecords.Application.DriverRecords.Interfaces;

public interface IDriverRecordReadService
{
    Task<IReadOnlyCollection<DriverRecordDto>> GetAllAsync(string? search, CancellationToken cancellationToken);

    Task<DriverRecordDto> GetByIdAsync(Guid id, CancellationToken cancellationToken);
}
