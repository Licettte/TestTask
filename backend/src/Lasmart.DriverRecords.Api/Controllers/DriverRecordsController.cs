using Lasmart.DriverRecords.Application.Common;
using Lasmart.DriverRecords.Application.DriverRecords.Dtos;
using Lasmart.DriverRecords.Application.DriverRecords.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Lasmart.DriverRecords.Api.Controllers;

[ApiController]
[Route("api/driver-records")]
public sealed class DriverRecordsController : ControllerBase
{
    private readonly IDriverRecordReadService _driverRecordReadService;
    private readonly IDriverRecordWriteService _driverRecordWriteService;

    public DriverRecordsController(
        IDriverRecordReadService driverRecordReadService,
        IDriverRecordWriteService driverRecordWriteService)
    {
        _driverRecordReadService = driverRecordReadService;
        _driverRecordWriteService = driverRecordWriteService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(ApiResponse<IReadOnlyCollection<DriverRecordDto>>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAllAsync([FromQuery] string? search, CancellationToken cancellationToken)
    {
        var records = await _driverRecordReadService.GetAllAsync(search, cancellationToken);
        return Ok(ApiResponse<IReadOnlyCollection<DriverRecordDto>>.Success(records, "Список записей получен."));
    }

    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(ApiResponse<DriverRecordDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var record = await _driverRecordReadService.GetByIdAsync(id, cancellationToken);
        return Ok(ApiResponse<DriverRecordDto>.Success(record, "Запись получена."));
    }

    [HttpPost]
    [ProducesResponseType(typeof(ApiResponse<DriverRecordDto>), StatusCodes.Status201Created)]
    public async Task<IActionResult> CreateAsync([FromBody] CreateDriverRecordRequest request, CancellationToken cancellationToken)
    {
        var record = await _driverRecordWriteService.CreateAsync(request, cancellationToken);
        return CreatedAtAction(nameof(GetByIdAsync), new { id = record.Id }, ApiResponse<DriverRecordDto>.Success(record, "Запись успешно создана."));
    }

    [HttpPatch("{id:guid}/payment-status")]
    [ProducesResponseType(typeof(ApiResponse<DriverRecordDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> UpdatePaymentStatusAsync(
        Guid id,
        [FromBody] UpdatePaymentStatusRequest request,
        CancellationToken cancellationToken)
    {
        var record = await _driverRecordWriteService.UpdatePaymentStatusAsync(id, request, cancellationToken);
        return Ok(ApiResponse<DriverRecordDto>.Success(record, "Статус оплаты обновлён."));
    }
}
