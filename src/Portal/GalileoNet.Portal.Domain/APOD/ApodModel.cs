namespace GalileoNet.Portal.Domain.APOD;

public record ApodModel(
    string Title,
    string Explanation,
    string MediaType,
    string Copyright,
    string Url,
    string HDUrl,
    DateTime Date);