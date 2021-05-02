using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.IO;
using Microsoft.Extensions.FileProviders;

namespace SSRBase.LandingPage
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            ConfigureLogging(env);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "ssrBase")),
                RequestPath = "/ssrBase"
            });

            app.UseRouting();

            app.UseEndpoints(endpoints =>
                {
                    endpoints.MapControllers();
                    endpoints.MapRazorPages();
                    endpoints.MapControllerRoute(
                        "default",
                        "ssrBase/",
                        new { controller = "Home", action = "Index" });
                }
            );
        }

        private static void ConfigureLogging(IWebHostEnvironment env)
        {
            var configFilename = env.EnvironmentName.Contains("development", StringComparison.OrdinalIgnoreCase)
               ? "nlog.config"
               : $"nlog.{env.EnvironmentName.ToLower()}.config";

            NLog.LogManager.LoadConfiguration(configFilename);
        }
    }
}
