using Lasmart.DriverRecords.Application.Common.Exceptions;
using Lasmart.DriverRecords.Application.DriverRecords.Dtos;
using Lasmart.DriverRecords.Domain.Enums;

namespace Lasmart.DriverRecords.Application.DriverRecords.Validation;

public static class DriverRecordRequestValidator
{
    public static void ValidateForCreate(CreateDriverRecordRequest request)
    {
        ValidateText(request.FirstName, 2, 50, "Имя");
        ValidateText(request.LastName, 2, 50, "Фамилия");
        ValidateText(request.MiddleName, 2, 50, "Отчество");
        ValidateText(request.City, 2, 80, "Город");

        var currentYear = DateTime.UtcNow.Year;
        if (request.BirthYear < 1940 || request.BirthYear > currentYear - 16)
        {
            throw new ValidationException("Год рождения указан некорректно.");
        }

        if (!Enum.TryParse<DrivingCategory>(request.DrivingCategory, true, out _))
        {
            throw new ValidationException("Категория вождения указана некорректно.");
        }
    }

    public static void ValidateForPaymentUpdate(UpdatePaymentStatusRequest request)
    {
        if (request is null)
        {
            throw new ValidationException("Запрос не должен быть пустым.");
        }
    }

    private static void ValidateText(string value, int minLength, int maxLength, string fieldName)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new ValidationException($"Поле '{fieldName}' обязательно для заполнения.");
        }

        var normalizedValue = value.Trim();
        if (normalizedValue.Length < minLength || normalizedValue.Length > maxLength)
        {
            throw new ValidationException($"Поле '{fieldName}' должно содержать от {minLength} до {maxLength} символов.");
        }
    }
}
