using System.ComponentModel.DataAnnotations;

namespace CRMApi.Models
{
    public class Product
    {
        [Key]
        public int product_id { get; set; }
        [Required]
        public string product_name { get; set; } = string.Empty;
        [Required]
        public decimal price { get; set; }
        [Required]
        public int stock { get; set; }
    }
}