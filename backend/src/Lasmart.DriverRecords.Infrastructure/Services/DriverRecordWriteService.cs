using Lasmart.DriverRecords.Application.Common.Exceptions;
using Lasmart.DriverRecords.Application.DriverRecords.Dtos;
using Lasmart.DriverRecords.Application.DriverRecords.Interfaces;
using Lasmart.DriverRecords.Application.DriverRecords.Validation;
using Lasmart.DriverRecords.Domain.Entities;
using Lasmart.DriverRecords.Domain.Enums;
using Lasmart.DriverRecords.Infrastructure.Persistence;

namespace Lasmart.DriverRecords.Infrastructure.Services;

public sealed class DriverRecordWriteService : IDriverRecordWriteService
{
    private readonly DriverRecordsDbContext _dbContext;
    private readonly IDriverRecordRepository _driverRecordRepository;
    private readonly IDriverRecordReadService _driverRecordReadService;

    public DriverRecordWriteService(
        DriverRecordsDbContext dbContext,
        IDriverRecordRepository driverRecordRepository,
        IDriverRecordReadService driverRecordReadService)
    {
        _dbContext = dbContext;
        _driverRecordRepository = driverRecordRepository;
        _driverRecordReadService = driverRecordReadService;
    }

    public async Task<DriverRecordDto> CreateAsync(CreateDriverRecordRequest request, CancellationToken cancellationToken)
    {
        DriverRecordRequestValidator.ValidateForCreate(request);

        var nowUtc = DateTime.UtcNow;
        var drivingCategory = Enum.Parse<DrivingCategory>(request.DrivingCategory, true);

        var driverRecord = new DriverRecord
        {
            Id = Guid.NewGuid(),
            FirstName = request.FirstName.Trim(),
            LastName = request.LastName.Trim(),
            MiddleName = request.MiddleName.Trim(),
            BirthYear = request.BirthYear,
            City = request.City.Trim(),
            DrivingCategory = drivingCategory,
            IsTuitionPaid = request.IsTuitionPaid,
            CreatedAtUtc = nowUtc,
            UpdatedAtUtc = nowUtc
        };

        await using var transaction = await _dbContext.Database.BeginTransactionAsync(cancellationToken);

        await _driverRecordRepository.AddAsync(driverRecord, cancellationToken);
        await _driverRecordRepository.SaveChangesAsync(cancellationToken);

        await transaction.CommitAsync(cancellationToken);

        return await _driverRecordReadService.GetByIdAsync(driverRecord.Id, cancellationToken);
    }

    public async Task<DriverRecordDto> UpdatePaymentStatusAsync(Guid id, UpdatePaymentStatusRequest request, CancellationToken cancellationToken)
    {
        DriverRecordRequestValidator.ValidateForPaymentUpdate(request);

        var driverRecord = await _driverRecordRepository.GetByIdAsync(id, cancellationToken)
            ?? throw new EntityNotFoundException("Запись не найдена.");

        driverRecord.IsTuitionPaid = request.IsTuitionPaid;
        driverRecord.UpdatedAtUtc = DateTime.UtcNow;

        await using var transaction = await _dbContext.Database.BeginTransactionAsync(cancellationToken);

        await _driverRecordRepository.SaveChangesAsync(cancellationToken);

        await transaction.CommitAsync(cancellationToken);

        return await _driverRecordReadService.GetByIdAsync(id, cancellationToken);
    }
}
