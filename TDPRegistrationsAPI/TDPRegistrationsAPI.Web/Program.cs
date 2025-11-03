using Microsoft.EntityFrameworkCore;
using TDPRegistrations.Infrastracture.Data;
using TDPRegistrationsAPI.Web.Extensions;

var builder = WebApplication.CreateSlimBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("MyInMemoryDatabaseDb"));

//builder.Services.AddDbContext<AppDbContext>(options =>
//    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//builder.Services.ConfigureHttpJsonOptions(options =>
//{
//    options.SerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonSerializerContext.Default);
//});

builder.Services.AddControllers();
builder.Services.RegisterService();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "ALL", policy =>
    {
        policy
        .AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();
app.AddInMemoryDatabaseMockContent();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("ALL");
//app.UseAuthorization();
app.MapControllers();
app.Run();

