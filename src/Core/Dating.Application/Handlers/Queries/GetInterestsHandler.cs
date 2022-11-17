using Dating.Application.Contracts.Models;

namespace Dating.Application.Handlers.Queries;

public class GetInterestsHandler : IRequestHandler<GetInterestsQuery, PagedResponseResult<InterestDto>>
{
    private readonly IRepository _repository;

    public GetInterestsHandler(IRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<PagedResponseResult<InterestDto>> Handle(
        GetInterestsQuery request, CancellationToken cancellationToken)
    {
        var interestsList = await _repository.GetListAsync<Interest>();
        var interestsDtoList = interestsList.Select(i => new InterestDto(i.Name)).ToList();
        var itemsCount = interestsDtoList.Count;
        return new PagedResponseResult<InterestDto>(interestsDtoList, itemsCount, 1);
    }
}