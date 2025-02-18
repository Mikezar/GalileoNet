using GalileoNet.WebService.Domain;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSerilog(configuration => configuration
    .WriteTo.Console()
    .MinimumLevel.Information());

builder.Services.AddControllers();
builder.Services.AddHealthChecks();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "GalileoWebApp",
        policy =>
        {
            policy
                .WithOrigins("https://zealous-coast-047ba9803.4.azurestaticapps.net")
                .AllowAnyMethod();
        });
});
builder.Services.RegisterServices(builder.Configuration);

var app = builder.Build();

app.UseRouting();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.MapHealthChecks("/api/health");
app.UsePathBase(new PathString("/api"));
app.Run();