using Microsoft.AspNetCore.Mvc;
using CRMApi.Data;
using CRMApi.Models;
using System.Linq;

namespace CRMApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrderController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetOrders()
        {
            return Ok(_context.orders.ToList());
        }

        [HttpPost]
        public IActionResult AddOrder(Order order)
        {
            _context.orders.Add(order);
            _context.SaveChanges();
            return Ok(order);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(int id)
        {
            var data = _context.orders.Find(id);
            if (data == null) return NotFound();

            _context.orders.Remove(data);
            _context.SaveChanges();
            return Ok();
        }
    }
}