namespace Lasmart.DriverRecords.Application.Common.Exceptions;

public sealed class ValidationException : ApplicationExceptionBase
{
    public ValidationException(string message)
        : base(message)
    {
    }
}
