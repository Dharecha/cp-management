using Microsoft.AspNetCore.Mvc;
using CRMApi.Data;
using CRMApi.Models;
using System.Linq;

namespace CRMApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderItemController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrderItemController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetOrderItems()
        {
            return Ok(_context.order_items.ToList());
        }

        [HttpPost]
        public IActionResult AddOrderItem(OrderItem item)
        {
            _context.order_items.Add(item);
            _context.SaveChanges();
            return Ok(item);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteOrderItem(int id)
        {
            var data = _context.order_items.Find(id);
            if (data == null) return NotFound();

            _context.order_items.Remove(data);
            _context.SaveChanges();
            return Ok();
        }
    }
}