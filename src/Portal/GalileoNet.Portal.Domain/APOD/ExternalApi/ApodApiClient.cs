using Microsoft.Extensions.Options;
using System.Text.Json;

namespace GalileoNet.Portal.Domain.APOD.ExternalApi;

internal sealed class ApodApiClient : IApodApiClient
{
    private const string ApodApi = "planetary/apod";

    private readonly HttpClient _httpClient;
    private readonly ApodApiOptions _apodApiOptions;

    public ApodApiClient(HttpClient httpClient, IOptions<ApodApiOptions> apodApiOptions)
    {
        _httpClient = httpClient;
        _apodApiOptions = apodApiOptions.Value;
    }

    public async Task<ApodResponse> GetData()
    {
        var response = await _httpClient.GetAsync($"{ApodApi}?api_key={_apodApiOptions.ApiKey}");

        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        var dto = JsonSerializer.Deserialize<ApodResponse>(content);

        if (dto is null)
        {
            throw new InvalidOperationException("APOD data are not returned by the API call");
        }

        return dto;
    }
}

