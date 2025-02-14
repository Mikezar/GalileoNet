namespace GalileoNet.Portal.Domain.APOD.ExternalApi;

public class ApodApiOptions
{
    public Uri NasaBaseAddress { get; init; }
    public string ApiKey { get; init; }
}