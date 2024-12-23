using CustomersAPI.Repositorios;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddRouting(routing => routing.LowercaseUrls = true);

//Con este codigo se activa el CORS Para servidores definidos en With Origins
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "MyPolicy",
         policy =>
         {
             policy.WithOrigins("http://127.0.0.1:3000") 
                     .AllowAnyMethod()
                     .AllowAnyHeader();
         });
});

//Se define la cadena de conexion aqui.
builder.Services.AddDbContext<CustomersDatabaseContext>(options =>
{
    options.UseSqlServer("Server=JOSEFINALOPEZ\\JONA;Database=APICUSTOMERS;Integrated Security=True;TrustServerCertificate=True;");
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Llama a las definiciones de CORS
app.UseCors("MyPolicy");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();