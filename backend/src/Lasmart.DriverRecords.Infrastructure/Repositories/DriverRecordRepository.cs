using Lasmart.DriverRecords.Application.DriverRecords.Interfaces;
using Lasmart.DriverRecords.Domain.Entities;
using Lasmart.DriverRecords.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Lasmart.DriverRecords.Infrastructure.Repositories;

public sealed class DriverRecordRepository : IDriverRecordRepository
{
    private readonly DriverRecordsDbContext _dbContext;

    public DriverRecordRepository(DriverRecordsDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task AddAsync(DriverRecord driverRecord, CancellationToken cancellationToken)
    {
        await _dbContext.DriverRecords.AddAsync(driverRecord, cancellationToken);
    }

    public Task<DriverRecord?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return _dbContext.DriverRecords.FirstOrDefaultAsync(record => record.Id == id, cancellationToken);
    }

    public Task SaveChangesAsync(CancellationToken cancellationToken)
    {
        return _dbContext.SaveChangesAsync(cancellationToken);
    }
}
