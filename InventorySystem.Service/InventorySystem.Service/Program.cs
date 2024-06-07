using Autofac.Extensions.DependencyInjection;
using Serilog;
using Serilog.Events;
using ILogger = Serilog.ILogger;

namespace InventorySystem.Service
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            var configuration = GetConfiguration();
            Log.Logger = CreateSerilogLogger(configuration);

            CreateHostBuilder(args)
                .Build()
                .Run();
        }
        
        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            return Host.CreateDefaultBuilder(args)
                    .UseServiceProviderFactory(new AutofacServiceProviderFactory())
                    .UseSerilog()
                    .ConfigureWebHostDefaults(webBuilder =>
                    {
                        webBuilder.UseStartup<Startup>();
                    });
        }
        private static ILogger CreateSerilogLogger(IConfiguration configuration)
        {
            return new LoggerConfiguration()
                .MinimumLevel.Verbose()
                .MinimumLevel.Override("Microsot.AspnetCore", LogEventLevel.Warning)
                .ReadFrom.Configuration(configuration)
                .CreateLogger();
        }

        private static IConfiguration GetConfiguration()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables();

            return builder.Build();
        }
    }
}
