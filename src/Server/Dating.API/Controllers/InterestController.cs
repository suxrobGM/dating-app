namespace Dating.API.Controllers;

[ApiController]
[Route("[controller]")]
public class InterestController : ControllerBase
{
    private readonly IMediator _mediator;

    public InterestController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    [HttpGet("list")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(ResponseResult<InterestDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ResponseResult), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetList([FromQuery] GetInterestsQuery request)
    {
        var result = await _mediator.Send(request);

        if (result.Success)
            return Ok(result);

        return BadRequest(result);
    }
}