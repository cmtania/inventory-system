

using Autofac;
using Autofac.Extensions.DependencyInjection;
using InventorySystem.Service.Interfaces;
using InventorySystem.Service.Middlewares;
using InventorySystem.Service.Models;
using InventorySystem.Service.Models.AccountModel;
using InventorySystem.Service.Models.DatabaseModel;
using InventorySystem.Service.Repository;
using InventorySystem.Service.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace InventorySystem.Service
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;

        }

        public void ConfigureServices(IServiceCollection services)
        {
           
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddControllers().AddJsonOptions(jsonOptions =>
            {
                jsonOptions.JsonSerializerOptions.PropertyNamingPolicy = null;
            });

            // Jwt configuration starts here
            var jwtIssuer = Configuration.GetSection("Jwt:Issuer").Get<string>();
            var jwtKey = Configuration.GetSection("Jwt:Key").Get<string>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
             .AddJwtBearer(options =>
             {
                 options.TokenValidationParameters = new TokenValidationParameters
                 {
                     ValidateIssuer = true,
                     ValidateAudience = true,
                     ValidateLifetime = true,
                     ValidateIssuerSigningKey = true,
                     ValidIssuer = jwtIssuer,
                     ValidAudience = jwtIssuer,
                     IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
                 };
             });

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder
                        .WithOrigins("http://localhost:1995")
                        .WithMethods("GET", "POST")
                        .AllowAnyHeader()
                        .AllowCredentials());
            });

            // add db connection
            var connectionString = Configuration.GetSection("DBConnection").Get<string>();
            services.AddDbContext<InventoryDBContext>(options => options.UseSqlServer(connectionString));

            var container = new ContainerBuilder();
            container.Populate(services);
        }

        public void ConfigureContainer(ContainerBuilder builder)
        {
            
            builder.RegisterType<AccountService>().As<IAccountService>();
            builder.RegisterType<AccountModel>().As<IAccountModel>();
            builder.RegisterType<UserRepository>().As<IUserRepository>();
            builder.RegisterType<LoginService>().As<ILoginService>();
            builder.RegisterType<ProductService>().As<IProductService>();
            builder.RegisterType<ProductRepository>().As<IProductRepository>();
            builder.RegisterType<BrandService>().As<IBrandService>();
            builder.RegisterType<BrandRepository>().As<IBrandRepository>();
            builder.RegisterType<CategoryService>().As<ICategoryService>();
            builder.RegisterType<CategoryRepository>().As<ICategoryRepository>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseCors("CorsPolicy");

            if (env.IsDevelopment()) { 
                app.UseDeveloperExceptionPage();
                app.UseSwagger();

                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My Api V1");
                });
            }

            app.UseForwardedHeaders();
            app.UseHttpsRedirection();
            app.UseResponseCaching();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            // Register your custom middleware
            app.UseMiddleware<HttpRequestValidateMiddleware>();

            app.UseEndpoints(endpoints => endpoints.MapControllers());
        }
    }
}
