namespace GalileoNet.Portal.Domain.APOD;

public interface IApodService
{
    Task<ApodModel> GetData();
}