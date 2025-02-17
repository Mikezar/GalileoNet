using GalileoNet.WebService.Shared.Caching;
using Microsoft.Extensions.DependencyInjection;

namespace GalileoNet.WebService.Shared;

public static class ServiceCollections
{
    public static MemoryCacheConfiguration AddInMemoryCache(this IServiceCollection services)
    {
        services.AddMemoryCache();
        return new MemoryCacheConfiguration(services);
    }
}