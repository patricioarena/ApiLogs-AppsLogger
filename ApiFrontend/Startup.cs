using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.AspNetCore.Server.IISIntegration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace ApiFrontend
{
    public class Startup
    {
        readonly string AllowAll = "_allowAll";

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;

            var builder = new ConfigurationBuilder()
            .SetBasePath(env.ContentRootPath)
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .AddConfiguration(configuration)
            .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            string Server = "ni idea";
            string Database = "ni idea";
            
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1",
                    new OpenApiInfo
                    {
                        Version = "v1",
                        Title = Configuration.GetSection("SwaggerOptions:Description").Value,
                        Description = $"**Server:** { Server }<br>" +
                         $"**Database:** { Database }<br>" +
                        $"**Runtime:** { System.Runtime.InteropServices.RuntimeInformation.FrameworkDescription }<br>" +
                        $"**netCore Version :** { System.Environment.Version }<br>" +
                        $"**Documentación :**  { Configuration.GetSection("SwaggerOptions:Doc").Value } [link]({ Configuration.GetSection("SwaggerOptions:Doc").Value })"
                    });

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });


            services.AddCors(options =>
            {
                options.AddPolicy(name: AllowAll,
                    builder =>
                    {
                        builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        ;
                    });
            });

            services.Configure<IISOptions>(options =>
            {
                options.AutomaticAuthentication = true;
            });
            services.AddAuthentication(IISDefaults.AuthenticationScheme);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            
#if DEBUG
            app.UseDeveloperExceptionPage();
#endif

            var swaggerUrl = Configuration.GetSection("SwaggerOptions:UIEndpoint").Value;
            app.UseSwagger();
            app.UseSwaggerUI(option =>
            {
                option.SwaggerEndpoint(swaggerUrl, "Api");
            });

            var rewrite = new RewriteOptions().AddRedirect("^$", "swagger");
            app.UseRewriter(rewrite);

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers()
                    .RequireCors(AllowAll);
            });

        }
    }
}
