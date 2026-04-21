namespace Lasmart.DriverRecords.Application.Common;

public sealed class ApiResponse<T>
{
    public bool IsSuccess { get; init; }

    public string Message { get; init; } = string.Empty;

    public T? Data { get; init; }

    public static ApiResponse<T> Success(T data, string message = "Request completed successfully.") =>
        new()
        {
            IsSuccess = true,
            Message = message,
            Data = data
        };

    public static ApiResponse<T> Failure(string message) =>
        new()
        {
            IsSuccess = false,
            Message = message
        };
}
