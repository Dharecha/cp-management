using Microsoft.AspNetCore.Mvc;
using CRMApi.Data;
using CRMApi.Models;
using System.Linq;

namespace CRMApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CustomerController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetCustomers()
        {
            return Ok(_context.customers.ToList());
        }

        [HttpPost]
        public IActionResult AddCustomer(Customer customer)
        {
            // Check if email already exists
            if (_context.customers.Any(c => c.email == customer.email))
            {
                return BadRequest(new { message = "Email already exists" });
            }

            _context.customers.Add(customer);
            _context.SaveChanges();
            return Ok(customer);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateCustomer(int id, Customer customer)
        {
            var data = _context.customers.Find(id);
            if (data == null) return NotFound();

            // Check if email already exists for another customer
            if (_context.customers.Any(c => c.email == customer.email && c.customer_id != id))
            {
                return BadRequest(new { message = "Email already exists" });
            }

            data.name = customer.name;
            data.email = customer.email;
            data.phone = customer.phone;
            data.address = customer.address;

            _context.SaveChanges();
            return Ok(data);
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteCustomer(int id)
        {
            var data = _context.customers.Find(id);
            if (data == null) return NotFound();

            _context.customers.Remove(data);
            _context.SaveChanges();
            return Ok();
        }
    }
}