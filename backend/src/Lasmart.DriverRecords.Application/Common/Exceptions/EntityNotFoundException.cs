namespace Lasmart.DriverRecords.Application.Common.Exceptions;

public sealed class EntityNotFoundException : ApplicationExceptionBase
{
    public EntityNotFoundException(string message)
        : base(message)
    {
    }
}
