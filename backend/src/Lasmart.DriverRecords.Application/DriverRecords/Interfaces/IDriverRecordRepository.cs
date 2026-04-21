using Lasmart.DriverRecords.Domain.Entities;

namespace Lasmart.DriverRecords.Application.DriverRecords.Interfaces;

public interface IDriverRecordRepository
{
    Task AddAsync(DriverRecord driverRecord, CancellationToken cancellationToken);

    Task<DriverRecord?> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    Task SaveChangesAsync(CancellationToken cancellationToken);
}
