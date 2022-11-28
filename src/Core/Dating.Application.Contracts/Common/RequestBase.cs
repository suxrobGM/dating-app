using MediatR;

namespace Dating.Application.Contracts.Common;

public abstract class RequestBase<T> : IRequest<T> where T : IResponseResult
{
}

public abstract class RequestBase : RequestBase<ResponseResult>
{
}
