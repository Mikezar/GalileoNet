using GalileoNet.Portal.Domain.APOD.ExternalApi;

namespace GalileoNet.Portal.Domain.APOD;

public sealed class ApodService : IApodService
{
    private readonly IApodApiClient _apodApiClient;

    public ApodService(IApodApiClient apodApiClient)
    {
        _apodApiClient = apodApiClient;
    }

    public async Task<ApodModel> GetData()
    {
        var data = await _apodApiClient.GetData();

        return new ApodModel(data.Title, data.Explanation, data.MediaType, data.Copyright, data.Url, data.HDUrl,
            data.Date);
    }
}