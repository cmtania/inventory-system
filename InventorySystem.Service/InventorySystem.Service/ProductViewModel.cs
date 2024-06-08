namespace InventorySystem.Service
{
    public class ProductViewModel
    {
        public int ProductId  { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public string? ProductDescription { get; set; }
        public string Brand { get; set; }
        public string Category { get; set; }
    }
}
