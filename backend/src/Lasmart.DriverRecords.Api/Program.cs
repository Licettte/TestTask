using Lasmart.DriverRecords.Infrastructure;
using Lasmart.DriverRecords.Infrastructure.Persistence;
using Lasmart.DriverRecords.Api.Middlewares;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "Frontend",
        corsPolicyBuilder =>
        {
            corsPolicyBuilder
                .AllowAnyHeader()
                .AllowAnyMethod()
                .WithOrigins("http://localhost:4200");
        });
});

var app = builder.Build();

app.UseMiddleware<GlobalExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("Frontend");
app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<DriverRecordsDbContext>();
    await DbInitializer.InitializeAsync(dbContext, CancellationToken.None);
}

app.Run();
