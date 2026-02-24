using System.ComponentModel.DataAnnotations;

namespace CRMApi.Models
{
    public class Order
    {
        [Key]
        public int order_id { get; set; }
        [Required]
        public int customer_id { get; set; }
        [Required]
        public int user_id { get; set; }
        [Required]
        public decimal total_amount { get; set; }
    }
}