using CustomersAPI.Data;
using CustomersAPI.Repositorios;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace CustomersAPI.Controllers
{
    //Para identificarlo como controlador
    [ApiController]
    //Routa de identificacion del controlador
    [Route("api/[controller]")]
    public class CustomerController : Controller
    {
        private readonly CustomersDatabaseContext _customersDatabaseContext;

        public CustomerController(CustomersDatabaseContext customersDatabaseContext)
        {
            _customersDatabaseContext = customersDatabaseContext;
        }
        

        //Esto va sin parametros  
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<CustomerDto>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetCustomers()
        {
            var result =   _customersDatabaseContext.Customer.Select(x => x.ToDto()).ToList();
            return new OkObjectResult(result);
        }

        //Esto seria si hay un solo dato en especifico 
        //La ruta seria //api/customer/id
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type=typeof(CustomerDto))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetCustomer(int id)
        {
            CustomersEntity result = await _customersDatabaseContext.Get(id);
            return new OkObjectResult(result.ToDto());
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomerDto))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<bool> DeleteCustomer(int id)
        {
            return await _customersDatabaseContext.Delete(id);
           
        }
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CreateCustomersDto))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> CreateCustomers(CreateCustomersDto customer)
        {
            CustomersEntity result = await _customersDatabaseContext.Add(customer);
            var url = Url.Action("GetCustomerById", "Customer", new { id = result.Id });
            return new CreatedResult(url,null);
        }
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomerDto))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateCustomer(CustomerDto customer)
        {
            var result = await _customersDatabaseContext.Update(customer);
            if (result != null)
            {
                return new OkObjectResult(result);

            }
            else
            {
                return NotFound(new
                {
                    Title = "Not Found",
                    Status = StatusCodes.Status404NotFound,
                    TraceId = HttpContext.TraceIdentifier // Puedes usar un identificador de traza para el seguimiento
                });
               
                //return new NotFoundObjectResult(result);
            }
        }
    }
}
