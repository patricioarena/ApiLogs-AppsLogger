using AutoMapper;
using Application;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.AspNetCore.Server.IISIntegration;
using Application.IFactory;
using Application.Factory;
using DataAccess.Helper;
using Application.IServices;
using Application.Services;
using System.Reflection;
using System.IO;

namespace ApiBackend
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
            //string ConnectionString = Configuration.GetConnectionString("SQLServer");
            string SQLServerLoggerConnectionStrings = Configuration.GetSection("SQLServerLogger").GetSection("ConnectionStrings").Value;

            services.AddControllers();

            services.AddScoped<IDbManager, DbManager>(_ =>
            {
                return new DbManager(SQLServerLoggerConnectionStrings);
            });

            services.AddScoped<IServiceLog, ServiceLog>();
            services.AddScoped<IAbstractServiceFactory, ConcreteServiceFactory>();

            //services.AddDbContext<DbContext>(options => options.UseSqlServer(Configuration.GetConnectionString(ConnectionString)));

            MapperConfiguration mapperConfiguration = new AutoMapper.MapperConfiguration(config =>
            {
                config.AddProfile(new AutoMapperProfileConfiguration("default"));
            });

            IMapper mapper = mapperConfiguration.CreateMapper();

            Dictionary<string,string> dic = keyValuePairs(SQLServerLoggerConnectionStrings);

            string Server = dic["Server"];
            string Database = dic["Database"];

            services.AddSingleton(mapper);
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

            static Dictionary<string, string> keyValuePairs(string connectionStrings)
            {
                if (connectionStrings.Last() == ';')
                    connectionStrings = connectionStrings.Remove(connectionStrings.Length - 1, 1);

                return connectionStrings.Split(';')
                  .Select(value => value.Split('='))
                  .ToDictionary(pair => pair[0], pair => pair[1]);
            }
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

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
