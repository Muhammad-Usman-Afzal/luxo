// ============================================================
// Program.cs — BazaarHub .NET Core Backend
// ============================================================
using Microsoft.EntityFrameworkCore;
using BazaarHub.Backend.Data;
using BazaarHub.Backend.Services;

var builder = WebApplication.CreateBuilder(args);

// ── DATABASE (SQL Server LocalDB) ──
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        sqlOptions =>
        {
            sqlOptions.EnableRetryOnFailure(maxRetryCount: 3);
            sqlOptions.CommandTimeout(30);
        }));

// ── SERVICES ──
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IChatService, ChatService>();
builder.Services.AddHttpContextAccessor();

// ── CONTROLLERS + SWAGGER ──
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "BazaarHub API", Version = "v1" });
});

// ── CORS (allow Vite at :5173) ──
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevCors", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "https://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// ── AUTO-CREATE DB + SEED DATA ──
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    try
    {
        await db.Database.EnsureCreatedAsync();
        await SeedData.InitializeAsync(db);
        Console.WriteLine("✅ DB ready — BazaarHubDb created & seeded on LocalDB.");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"⚠️  DB init skipped: {ex.Message}");
    }
}

// ── MIDDLEWARE ──
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "BazaarHub API v1");
        c.RoutePrefix = "swagger";
    });
    app.UseCors("DevCors");
}

app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();
app.MapControllers();

Console.WriteLine("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
Console.WriteLine("🚀 Backend API  → http://localhost:5050");
Console.WriteLine("📚 Swagger      → http://localhost:5050/swagger");
Console.WriteLine("🌐 Frontend     → http://localhost:5173");
Console.WriteLine("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

app.Run();
