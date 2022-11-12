using Microsoft.AspNetCore.Identity;

namespace Dating.Application.Handlers.Commands;

internal class CreateAccountHandler : IRequestHandler<CreateAccountCommand, ResponseResult>
{
    private readonly UserManager<User> _userManager;
    private readonly IRepository _repository;

    public CreateAccountHandler(
        UserManager<User> userManager,
        IRepository repository)
    {
        _userManager = userManager;
        _repository = repository;
    }
    
    public async Task<ResponseResult> Handle(CreateAccountCommand request, CancellationToken cancellationToken)
    {
        var profile = new Profile
        {
            LivingCity = request.LivingCity,
            Orientation = request.Orientation,
        };
        var user = new User(request.Email!)
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Birthdate = request.Birthdate,
            Gender = request.Gender,
            Profile = profile,
        };

        await AddInterests(user, request.Interests!);
        await _userManager.CreateAsync(user, request.Password!);
        return ResponseResult.CreateSuccess();
    }

    private async Task AddInterests(User user, IEnumerable<string> interests)
    {
        var normalizedInterests = interests.Select(i => i.ToUpper()).ToArray();
        var fetchedInterests = await _repository.GetListAsync<Interest>(i => normalizedInterests.Contains(i.NormalizedName));
        user.Interests = fetchedInterests;
    }
}