namespace GalileoNet.WebService.Domain.APOD;

public interface IApodService
{
    Task<ApodModel> GetData();
}