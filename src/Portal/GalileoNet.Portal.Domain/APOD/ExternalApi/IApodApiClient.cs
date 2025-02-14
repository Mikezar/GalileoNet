namespace GalileoNet.Portal.Domain.APOD.ExternalApi;

public interface IApodApiClient
{
    Task<ApodResponse> GetData();
}