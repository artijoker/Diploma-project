using CorporateBlog.Infrastructure.Data;
using CorporateBlog.Infrastructure.Data.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using CorporateBlog.Domain.Entities;
using CorporateBlog.Domain;
using CorporateBlog.Domain.Services;
using CorporateBlog.Domain.Repositories;
using CorporateBlog.WebApi.Middlewares;
using CorporateBlog.WebApi.Filters;
using Serilog;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateBootstrapLogger();
Log.Information("Server RUN.");

try
{
    var builder = WebApplication.CreateBuilder(args);

    var jwtConfig = builder.Configuration
            .GetSection("JwtConfig")
            .Get<JwtConfig>();

    var parameters = new TokenValidationParameters
    {
        IssuerSigningKey = new SymmetricSecurityKey(jwtConfig.SigningKeyBytes),
        ValidateIssuerSigningKey = true,
        ValidateLifetime = true,
        RequireExpirationTime = true,
        RequireSignedTokens = true,

        ValidateAudience = true,
        ValidateIssuer = true,
        ValidAudiences = new[] { jwtConfig.Audience },
        ValidIssuer = jwtConfig.Issuer,
    };

    builder.Host.UseSerilog((context, config) => config.ReadFrom.Configuration(context.Configuration));

    //Sqlite
    //const string dbPath = "myapp.db";
    //builder.Services.AddDbContext<AppDbContext>(
    //    options => options.UseSqlite($"Data Source={dbPath};")
    //    );


    //MySQL
    const string connectionString = "server=localhost;port=3306;user=root;password=56537;database=InternalCorporateBlog";
    builder.Services.AddDbContext<AppDbContext>(
            options => options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
        );

    builder.Services.AddAuthentication(
            options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(
            options =>
            {
                options.TokenValidationParameters = parameters;
            });



    builder.Services.AddSingleton<IPasswordHasher<Account>, PasswordHasher<Account>>();
    builder.Services.AddSingleton(jwtConfig);
    builder.Services.AddSingleton(parameters);
    builder.Services.AddSingleton<ITokenService, TokenService>();

    builder.Services.AddScoped(typeof(IRepository<>), typeof(EfRepository<>));
    builder.Services.AddScoped<IAccountRepository, AccountRepository>();
    builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
    builder.Services.AddScoped<ICommentRepository, CommentRepository>();
    builder.Services.AddScoped<IPostRepository, PostRepository>();
    builder.Services.AddScoped<IRoleRepository, RoleRepository>();
    builder.Services.AddScoped<IBlockedJwtTokenRepository, BlockedJwtTokenRepository>();
    builder.Services.AddScoped<ILikeRepository, LikeRepository>();
    builder.Services.AddScoped<IDislikeRepository, DislikeRepository>();
    builder.Services.AddScoped<IComplaintOnCommentRepository, ComplaintOnCommentRepository>();
    builder.Services.AddScoped<IComplaintOnPostRepository, ComplaintOnPostRepository>();
    builder.Services.AddScoped<ISubscriptionRepository, SubscriptionRepository>();

    builder.Services.AddScoped<IUnitOfWork, UnitOfWorkEf>();

    builder.Services.AddScoped<AccountService>();
    builder.Services.AddScoped<AuthorizationService>();
    builder.Services.AddScoped<CategoryService>();
    builder.Services.AddScoped<CommentService>();
    builder.Services.AddScoped<RegistrationService>();
    builder.Services.AddScoped<RoleService>();
    builder.Services.AddScoped<PostService>();
    builder.Services.AddScoped<SecurityService>();
    builder.Services.AddScoped<ComplaintService>();

    builder.Services.AddMemoryCache();

    builder.Services.AddControllers(options =>
    {
        options.Filters.Add<ExceptionFilter>();
        options.Filters.Add<ModelValidationFilterAttribute>();
    });

    var app = builder.Build();

    app.UseCors(policy =>
    {
        policy.AllowAnyMethod()
            .AllowAnyHeader()
            //.WithOrigins("http://localhost:4200")
            .SetIsOriginAllowed(isOriginAllowed: _ => true)
            .AllowCredentials();
    });

    app.UseMiddleware<SecurityMiddleware>();
    app.UseAuthentication();
    app.UseAuthorization();


    app.MapControllers();

    //DefaultFilesOptions options = new DefaultFilesOptions();
    //options.DefaultFileNames.Clear();
    //options.DefaultFileNames.Add("user.html");

    //app.UseDefaultFiles(options);
    //app.UseStaticFiles();

    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Server FATAL ERROR!!!");

}
finally
{
    Log.Information("Server SHUTDOWN.");
}



