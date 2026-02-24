using System.ComponentModel.DataAnnotations;

namespace CRMApi.Models
{
    public class User
    {
        [Key]
        public int user_id { get; set; }

        [Required]
        public string name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string email { get; set; } = string.Empty;

        [Required]
        public string phone { get; set; } = string.Empty;

        [Required]
        public string password { get; set; } = string.Empty;

        [Required]
        public string role { get; set; } = "User"; // Default role
    }
}