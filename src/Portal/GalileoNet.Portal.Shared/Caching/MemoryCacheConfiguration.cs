using Microsoft.Extensions.DependencyInjection;

namespace GalileoNet.Portal.Shared.Caching;

public class MemoryCacheConfiguration
{
    private readonly IServiceCollection _serviceCollection;

    public MemoryCacheConfiguration(IServiceCollection serviceCollection)
    {
        _serviceCollection = serviceCollection;
    }

    public MemoryCacheConfiguration For<TData>()
    {
        _serviceCollection.AddScoped<ICache<TData>, InMemoryCache<TData>>();
        return this;
    }
}