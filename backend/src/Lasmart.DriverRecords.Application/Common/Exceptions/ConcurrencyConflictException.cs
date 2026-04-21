namespace Lasmart.DriverRecords.Application.Common.Exceptions;

public sealed class ConcurrencyConflictException : ApplicationExceptionBase
{
    public ConcurrencyConflictException(string message)
        : base(message)
    {
    }
}
