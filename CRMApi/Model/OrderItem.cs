using System.ComponentModel.DataAnnotations;

namespace CRMApi.Models
{
    public class OrderItem
    {
        [Key]
        public int order_item_id { get; set; }
        [Required]
        public int order_id { get; set; }
        [Required]
        public int product_id { get; set; }
        [Required]
        public int quantity { get; set; }
        [Required]
        public decimal price { get; set; }
    }
}