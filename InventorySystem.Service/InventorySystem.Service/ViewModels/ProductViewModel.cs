namespace InventorySystem.Service.ViewModels
{
    public class ProductViewModel
    {
        public int ProductId { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public double UnitPrice { get; set; }
        public string? ProductDescription { get; set; }
        public int BrandId { get; set; }
        public string Brand { get; set; }
        public int CategoryId { get; set; }
        public string Category { get; set; }
    }
}
