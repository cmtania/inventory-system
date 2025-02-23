namespace InventorySystem.Service.Models.RequestModel
{
    public class InventoryRequest
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string Supplier {  get; set; }
        public string Quantity {  get; set; }
        public int UnitPrice { get; set; }
    }

    public class SaveInventoryRequest
    {
        public int InventoryId { get; set; }
        public int ProductId { get; set; }
        public string Supplier { get; set; }
        public int Quantity { get; set; }
        public double UnitPrice { get; set; }
    }
}
