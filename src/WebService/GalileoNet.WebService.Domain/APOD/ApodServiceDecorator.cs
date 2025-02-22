using GalileoNet.WebService.Shared.Caching;

namespace GalileoNet.WebService.Domain.APOD;

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

    public async Task<ApodModel> GetData(DateOnly date)
    {
        var formattedKey = $"{CacheKey}_{date.ToString()}";
        return await _cache.GetOrAdd(formattedKey, DateTime.Today.AddDays(1), () => _apodService.GetData(date));
    }
}