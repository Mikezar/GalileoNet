using GalileoNet.Portal.Shared.Caching;

namespace GalileoNet.Portal.Domain.APOD;

public sealed class ApodServiceDecorator : IApodService
{
    private const string CacheKey = "APOD";

    private readonly IApodService _apodService;
    private readonly ICache<ApodModel> _cache;

    public ApodServiceDecorator(IApodService apodService, ICache<ApodModel> cache)
    {
        _apodService = apodService;
        _cache = cache;
    }

    public async Task<ApodModel> GetData()
    {
        return await _cache.GetOrAdd(CacheKey, DateTime.Today.AddDays(1), _apodService.GetData);
    }
}