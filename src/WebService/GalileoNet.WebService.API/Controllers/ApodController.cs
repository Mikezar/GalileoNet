using GalileoNet.WebService.Domain.APOD;
using Microsoft.AspNetCore.Mvc;

namespace GalileoNet.WebService.API.Controllers;

[ApiController]
[Route("apod")]
public class ApodController : ControllerBase
{
    private readonly ILogger<ApodController> _logger;
    private readonly IApodService _apodService;

    public ApodController(ILogger<ApodController> logger, IApodService apodService)
    {
        _logger = logger;
        _apodService = apodService;
    }

    [HttpGet("data")]
    public async Task<ApodModel> Get()
    {
        var apodModel = await _apodService.GetData();
        return apodModel;
    }
}