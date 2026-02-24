using Microsoft.AspNetCore.Mvc;
using CRMApi.Data;
using CRMApi.Models;
using System.Linq;

namespace CRMApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok(_context.users.ToList());
        }

        [HttpPost]
        public IActionResult AddUser(User user)
        {
            // Check if email already exists
            if (_context.users.Any(u => u.email == user.email))
            {
                return BadRequest(new { message = "Email already exists" });
            }

            _context.users.Add(user);
            _context.SaveChanges();
            return Ok(user);
        }
        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, User user)
        {
            var data = _context.users.Find(id);
            if (data == null) return NotFound();
            // Check if email already exists for another user
            if (_context.users.Any(u => u.email == user.email && u.user_id != id))
            {
                return BadRequest(new { message = "Email already exists" });
            }

            data.name = user.name;
            data.email = user.email;
            data.phone = user.phone;

            _context.SaveChanges();
            return Ok(data);
        }
        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _context.users.Find(id);
            if (user == null)
                return NotFound();

            return Ok(user);
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var data = _context.users.Find(id);
            if (data == null) return NotFound();

            _context.users.Remove(data);
            _context.SaveChanges();
            return Ok();
        }
    }
}