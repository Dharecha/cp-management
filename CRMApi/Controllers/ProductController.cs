using Microsoft.AspNetCore.Mvc;
using CRMApi.Data;
using CRMApi.Models;
using System.Linq;

namespace CRMApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetProducts()
        {
            return Ok(_context.products.ToList());
        }

        [HttpPost]
        public IActionResult AddProduct(Product product)
        {
            _context.products.Add(product);
            _context.SaveChanges();
            return Ok(product);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, Product product)
        {
            var data = _context.products.Find(id);
            if (data == null) return NotFound();

            data.product_name = product.product_name;
            data.price = product.price;
            data.stock = product.stock;

            _context.SaveChanges();
            return Ok(data);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var data = _context.products.Find(id);
            if (data == null) return NotFound();

            _context.products.Remove(data);
            _context.SaveChanges();
            return Ok();
        }
    }
}