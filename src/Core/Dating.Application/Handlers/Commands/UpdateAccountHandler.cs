using System.Text;
using Microsoft.AspNetCore.Identity;

namespace Dating.Application.Handlers.Commands;

internal class UpdateAccountHandler : IRequestHandler<UpdateAccountCommand, ResponseResult>
{
    private readonly UserManager<User> _userManager;

    public UpdateAccountHandler(UserManager<User> userManager)
    {
        _userManager = userManager;
    }
    
    public async Task<ResponseResult> Handle(UpdateAccountCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByIdAsync(request.Id);

        if (user == null)
            return ResponseResult.CreateError("Could not find the specified user");

        if (!string.IsNullOrEmpty(request.Email) && user.Email != request.Email)
        {
            user.UserName = request.Email;
            user.Email = request.Email;
            await _userManager.UpdateAsync(user);
        }

        if (string.IsNullOrEmpty(request.NewPassword))
            return ResponseResult.CreateSuccess();
        
        var changePasswordResult = await _userManager.ChangePasswordAsync(user, request.OldPassword!, request.NewPassword!);

        if (!changePasswordResult.Succeeded)
        {
            return ResponseResult.CreateError(ErrorsToString(changePasswordResult.Errors));
        }

        return ResponseResult.CreateSuccess();
    }

    private static string ErrorsToString(IEnumerable<IdentityError> errors)
    {
        var errorsStr = new StringBuilder();
        foreach (var error in errors)
        {
            errorsStr.AppendLine(error.Description);
        }

        return errorsStr.ToString();
    }
}