using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Converters;

namespace ChevinAPI
{
    public class Startup
    {
        private readonly string CORS_POLICY = "CorsPolicy";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers()
                .AddNewtonsoftJson(options =>
                options.SerializerSettings.Converters.Add(new StringEnumConverter()));

            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("ChevinAPI", new OpenApiInfo { Title = "Chevin API", Version = "v1", });
                options.DocInclusionPredicate((docName, description) => true);
            });

            services.AddSwaggerGenNewtonsoftSupport();

            services.AddCors(options =>
            {
                options.AddPolicy(CORS_POLICY,
                    builder =>
                    {
                        // Development
                        builder
                            .WithOrigins("http://localhost:3000")
                            .AllowAnyMethod()
                            .AllowAnyHeader();

                        // Production 
                        //builder
                        //    .WithOrigins("https://domain-name.com")
                        //    .AllowAnyMethod()
                        //    .AllowAnyHeader();

                        //builder
                        //    .WithOrigins("https://www.domain-name.com")
                        //    .AllowAnyMethod()
                        //    .AllowAnyHeader();
                    });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(CORS_POLICY);

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger(o =>
            {
                o.SerializeAsV2 = true;
            });


            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/ChevinAPI/swagger.json", "Chevin API V1");
                c.RoutePrefix = string.Empty;
            });

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
