using GalileoNet.Portal.Domain;
using Microsoft.AspNetCore.Builder;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSerilog(configuration => configuration
    .WriteTo.Console()
    .MinimumLevel.Debug());
builder.Services.AddControllers();
builder.Services.RegisterServices(builder.Configuration);

var app = builder.Build();

app.UseRouting();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.UsePathBase(new PathString("/api"));
app.Run();