namespace GalileoNet.WebService.Domain.APOD.ExternalApi;

public interface IApodApiClient
{
    Task<ApodResponse> GetData();
}