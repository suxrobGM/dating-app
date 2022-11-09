namespace Dating.Application.Contracts.Common;

public interface IResponseResult
{
    bool Success { get; }
    string? Error { get; init; }
}