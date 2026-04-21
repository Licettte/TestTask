using Lasmart.DriverRecords.Application.DriverRecords.Dtos;

namespace Lasmart.DriverRecords.Application.DriverRecords.Interfaces;

public interface IDriverRecordWriteService
{
    Task<DriverRecordDto> CreateAsync(CreateDriverRecordRequest request, CancellationToken cancellationToken);

    Task<DriverRecordDto> UpdatePaymentStatusAsync(Guid id, UpdatePaymentStatusRequest request, CancellationToken cancellationToken);
}
