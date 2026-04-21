namespace Lasmart.DriverRecords.Application.Common;

public abstract class ApplicationExceptionBase : Exception
{
    protected ApplicationExceptionBase(string message)
        : base(message)
    {
    }
}
