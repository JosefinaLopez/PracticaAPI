using System.ComponentModel.DataAnnotations;

namespace CustomersAPI.Data
{
    public class CreateCustomersDto
    {
        [Required(ErrorMessage = "El nombre propio tiene que ser especificado")]
        public string? FistName { get; set; }
        [Required(ErrorMessage = "El apellido propio tiene que ser especificado")]
        public string? LastName { get; set; }
        [RegularExpression("^[a-zA-Z0-9?=_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", ErrorMessage = "El Email no es correcto")]
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
    }
}
