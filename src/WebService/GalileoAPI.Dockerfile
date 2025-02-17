FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build

WORKDIR /app
COPY . ./
RUN dotnet restore
RUN dotnet publish -c release -o /app/build --no-restore

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:9.0-alpine
WORKDIR /app
COPY --from=build /app/build .
ENTRYPOINT ["dotnet", "GalileoNet.WebService.API.dll"]