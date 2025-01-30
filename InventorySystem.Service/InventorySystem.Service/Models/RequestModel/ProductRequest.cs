namespace InventorySystem.Service.Models.RequestModel
{
    public class ProductRequest
    {
        public int ProductId { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public int UnitPrice { get; set; }
        public string? ProductDescription { get; set; }
        public int BrandId { get; set; }
        public int CategoryId { get; set; }
    }

    public class SaveProductRequest
    {
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public int UnitPrice { get; set; }
        public string? ProductDescription { get; set; }
        public int BrandId { get; set; }
        public int CategoryId { get; set; }
    }
}
