using System.Text.Json.Serialization;

namespace GalileoNet.WebService.Domain.APOD.ExternalApi;

public record ApodResponse(
    [property: JsonPropertyName("title")] string Title,
    [property: JsonPropertyName("explanation")]
    string Explanation,
    [property: JsonPropertyName("media_type")]
    string MediaType,
    [property: JsonPropertyName("copyright")]
    string Copyright,
    [property: JsonPropertyName("url")] string Url,
    [property: JsonPropertyName("hdurl")] string HDUrl,
    [property: JsonPropertyName("date")] DateTime Date);