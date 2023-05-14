using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Warehouse.Models
{
    public class ItemModel
    {
        [Key]
        public int itemID { get; set; }
        [Required]
        [StringLength(16)]
        public string? name { get; set; }
        public string? description { get; set; }
        public string? category { get; set; }
        public float quantity { get; set; }
        public string? unit { get; set; }
        public float price { get; set; }
    }
}
