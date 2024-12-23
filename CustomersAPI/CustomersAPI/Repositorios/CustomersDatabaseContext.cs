using CustomersAPI.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.ComponentModel.DataAnnotations;

namespace CustomersAPI.Repositorios
{
    public class CustomersDatabaseContext:DbContext
    {

        public CustomersDatabaseContext(DbContextOptions<CustomersDatabaseContext> options) : base(options)
        {

        }
        public DbSet<CustomersEntity> Customer { get; set; }
        //Obtiene registro por Id
        public async Task<CustomersEntity?> Get(long id)
        {
            return await Customer.FirstOrDefaultAsync(x => x.Id == id);  
        }
        #region metodos CRUD?
        public async Task<CustomersEntity> Add(CreateCustomersDto customerDTO)
        {
            CustomersEntity entity = new CustomersEntity()
            {
                Id = null,
                Address = customerDTO.Address,
                Email = customerDTO.Email,
                FistName = customerDTO.FistName,
                LastName = customerDTO.LastName,
                Phone = customerDTO.Phone

            };
            EntityEntry<CustomersEntity> resp = await Customer.AddAsync(entity);
            await SaveChangesAsync();
            return await Get(resp.Entity.Id ?? throw new Exception("No se puedo guardar registro"));
        }

        public async Task<CustomersEntity?> Update(CustomerDto customer)
        {
            var existingCustomer = await Customer.FindAsync(customer.Id);

            if (existingCustomer != null)
            {
                existingCustomer.Address = customer.Address;
                existingCustomer.Email = customer.Email;
                existingCustomer.FistName = customer.FistName;
                existingCustomer.LastName = customer.LastName;
                existingCustomer.Phone = customer.Phone;

                Customer.Update(existingCustomer);

                await SaveChangesAsync();

                return existingCustomer;
            }

            return null;
        }
        public async Task<bool> Delete(int id)
        {
           
            var bd = Customer.Find(id);
            if (bd != null)
            {
                Customer.Remove(bd);   
                await SaveChangesAsync();
                return true;
            }
                return false;
        }
        

        #endregion

    }
    public class CustomersEntity
    {
        public int? Id { get; set; }
        [Required(ErrorMessage = "El nombre propio tiene que ser especificado")]
        public string? FistName { get; set; }
        [Required(ErrorMessage = "El apellido propio tiene que ser especificado")]
        public string? LastName { get; set; }
        [RegularExpression("^[a-zA-Z0-9?=_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", ErrorMessage = "El Email no es correcto")]
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }



        public CustomerDto ToDto()
        {
            return new CustomerDto()
            {
                Address = Address,
                Email = Email,
                FistName = FistName,
                LastName = LastName,
                Phone = Phone,
                Id = Id
            };
        }
    }
}
