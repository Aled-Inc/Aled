﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DotNetEnv;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using NUglify.Helpers;
using Serilog;
using Serilog.Events;

namespace Aled;

public static class Program
{
    public static async Task<int> Main(string[] args)
    {
        Log.Logger = new LoggerConfiguration()
#if DEBUG
            .MinimumLevel.Debug()
#else
            .MinimumLevel.Information()
#endif
            .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
            .MinimumLevel.Override("Microsoft.EntityFrameworkCore", LogEventLevel.Warning)
            .Enrich.FromLogContext()
            .WriteTo.Async(c => c.File("Logs/logs.txt"))
            .WriteTo.Async(c => c.Console())
            .CreateLogger();

        try
        {
            Log.Information("Starting Aled.AuthServer.");
            var builder = WebApplication.CreateBuilder(args);

            if (builder.Environment.IsDevelopment())
            {
                Env.Load("../.env");

                var envKeys = new Dictionary<string, string>
                {
                    { "App:SelfUrl", "AUTH_SERVER_URL" },
                    { "App:CorsOrigins", "AUTH_SERVER_CORS_ORIGIN" },
                    { "JwtSettings:ValidIssuer", "NGROK_AUTH_SERVER_URL" },
                    { "Kestrel:Endpoints:Https:Url", "AUTH_SERVER_URL" },
                    { "Kestrel:Endpoints:Https:Certificate:Path", "PFX_PATH" },
                    { "Kestrel:Endpoints:Https:Certificate:Password", "PFX_PASS" }
                };

                envKeys.ForEach(keyValuePair =>
                {
                    var value = Environment.GetEnvironmentVariable(keyValuePair.Value);

                    if (string.IsNullOrEmpty(value))
                    {
                        throw new Exception(
                            $"ConfigurationError: an error occured on {keyValuePair.Value} env key. Ensure the .env file is correctly configured and placed in the root directory.");
                    }

                    builder.Configuration.AddInMemoryCollection(new Dictionary<string, string?>
                    {
                        { keyValuePair.Key, value }
                    });
                });
            }

            builder.Host.AddAppSettingsSecretsJson()
                .UseAutofac()
                .UseSerilog();
            await builder.AddApplicationAsync<AledAuthServerModule>();
            var app = builder.Build();
            await app.InitializeApplicationAsync();
            await app.RunAsync();
            return 0;
        }
        catch (Exception ex)
        {
            if (ex is HostAbortedException)
            {
                throw;
            }

            Log.Fatal(ex, "Aled.AuthServer terminated unexpectedly!");
            return 1;
        }
        finally
        {
            await Log.CloseAndFlushAsync();
        }
    }
}