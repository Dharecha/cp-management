using CRMApi.Data;
using CRMApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();

// Add distributed cache for session
builder.Services.AddDistributedMemoryCache();

// Add session services
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

// Add authentication
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/api/auth/login";
        options.AccessDeniedPath = "/api/auth/accessdenied";
    });

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontendDev", policy =>
    {
        policy
            .SetIsOriginAllowed(origin =>
            {
                if (!Uri.TryCreate(origin, UriKind.Absolute, out var uri))
                {
                    return false;
                }

                var isHttp = uri.Scheme == Uri.UriSchemeHttp;
                var isVitePort = uri.Port >= 5173 && uri.Port <= 5177;
                var isLocalHost = uri.Host.Equals("localhost", StringComparison.OrdinalIgnoreCase) ||
                                  uri.Host.Equals("127.0.0.1");
                var isPrivateLan = uri.Host.StartsWith("10.") ||
                                   uri.Host.StartsWith("192.168.") ||
                                   uri.Host.StartsWith("172.");

                return isHttp && isVitePort && (isLocalHost || isPrivateLan);
            })
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

// PostgreSQL connection
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Swagger (API testing)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Seed the database
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    context.Database.EnsureCreated(); // Creates database if not exists

    if (!context.users.Any())
    {
        context.users.AddRange(
            new User { name = "Admin User", email = "admin@example.com", phone = "1234567890", password = "1234567890", role = "Admin" },
            new User { name = "John Doe", email = "john@example.com", phone = "0987654321", password = "0987654321", role = "User" }
        );
    }

    if (!context.customers.Any())
    {
        context.customers.AddRange(
            new Customer { name = "Alice Smith", email = "alice@example.com", phone = "1112223333", address = "123 Main St" },
            new Customer { name = "Bob Johnson", email = "bob@example.com", phone = "4445556666", address = "456 Oak Ave" }
        );
    }

    if (!context.products.Any())
    {
        context.products.AddRange(
            new Product { product_name = "Laptop", price = 999.99m, stock = 10 },
            new Product { product_name = "Mouse", price = 25.99m, stock = 50 }
        );
    }

    if (!context.orders.Any())
    {
        context.orders.AddRange(
            new Order { customer_id = 1, user_id = 1, total_amount = 1025.98m },
            new Order { customer_id = 2, user_id = 2, total_amount = 25.99m }
        );
    }

    context.SaveChanges();
}

// Middleware
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

// Enable CORS
app.UseCors("AllowFrontendDev");

app.UseSession();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
