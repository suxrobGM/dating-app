using Dating.DbMigrator.Services;
using Dating.Infrastructure.EF;
using Serilog;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateBootstrapLogger();

Log.Information("Starting up");

var host = Host.CreateDefaultBuilder(args)
    .ConfigureAppConfiguration(configuration =>
    {
        var dataFile = Path.Combine(AppContext.BaseDirectory, "data.json");
        configuration.AddJsonFile(dataFile, false);
    })
    .ConfigureServices((ctx, services) =>
    {
        services.AddInfrastructureLayer(ctx.Configuration);
        services.AddHostedService<SeedDataService>();
    })
    .UseSerilog()
    .Build();

await host.RunAsync();