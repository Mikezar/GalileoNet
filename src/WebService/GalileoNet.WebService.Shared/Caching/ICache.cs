namespace GalileoNet.WebService.Shared.Caching;

public interface ICache<TData>
{
    Task<TData> GetOrAdd(string key, DateTime absoluteExpirationDate, Func<Task<TData>> delegateAction);
}