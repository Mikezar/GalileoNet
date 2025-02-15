using GalileoNet.Portal.Domain.APOD;
using GalileoNet.Portal.Domain.APOD.ExternalApi;
using GalileoNet.Portal.Shared;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace GalileoNet.Portal.Domain;

public static class ServiceCollections
{
    public static IServiceCollection RegisterServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<ApodApiOptions>(configuration.GetSection("ApodOptions"));
        services.AddScoped<IApodService, ApodService>();
        services.Decorate<IApodService, ApodServiceDecorator>();
        services.AddHttpClient<IApodApiClient, ApodApiClient>((provider, client) =>
        {
            var options = provider.GetService<IOptions<ApodApiOptions>>();
            client.BaseAddress = options!.Value.NasaBaseAddress;
        });

        services.AddInMemoryCache().For<ApodModel>();

        return services;
    }
}