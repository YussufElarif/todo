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
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using AutoMapper;

using Todo.DataAccess;
using Todo.Services.Infrastructure;
using Todo.DataStore.Infrastructure;
using Todo.Api.Mappers.Infrastructure;
using Todo.ScheduledTasks.Infrastructure;

namespace Todo.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<TodoContext>(opt => opt.UseInMemoryDatabase("TodoList"));

            services.AddMvc()
                    .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddSingleton<IMapper>(provider =>
            {
                var config = new MapperConfiguration(c => c.AddApiProfiles());
                return new Mapper(config);
            });

            services.AddServices()
                    .AddDataStore()
                    .AddScheduledTasks();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseCors(cors => cors
                .AllowCredentials()
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowAnyOrigin());

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
