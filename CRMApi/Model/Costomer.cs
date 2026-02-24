using System.ComponentModel.DataAnnotations;

namespace CRMApi.Models
{
    public class Customer
    {
        [Key]
        public int customer_id { get; set; }

        [Required]
        public string name { get; set; } = string.Empty;
        [Required]
        [EmailAddress]
        public string email { get; set; } = string.Empty;
        [Required]
        public string phone { get; set; } = string.Empty;
        [Required]
        public string address { get; set; } = string.Empty;
    }
}