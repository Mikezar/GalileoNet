using Microsoft.Extensions.Caching.Memory;

namespace GalileoNet.WebService.Shared.Caching;

internal sealed class InMemoryCache<TData> : ICache<TData>
{
    private readonly IMemoryCache _memoryCache;

    public InMemoryCache(IMemoryCache memoryCache) =>
        _memoryCache = memoryCache;

    public async Task<TData> GetOrAdd(string key, DateTime absoluteExpirationDate, Func<Task<TData>> delegateAction)
    {
        var cachedData = await _memoryCache.GetOrCreateAsync(
            key,
            async cacheEntry =>
            {
                cacheEntry.SetAbsoluteExpiration(absoluteExpirationDate);
                return await delegateAction();
            });

        return cachedData!;
    }
}