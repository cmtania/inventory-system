namespace InventorySystem.Service.ViewModels
{
    public class InventoryViewModel
    {
        public int InventoryId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string Supplier { get; set; }
        public double UnitPrice { get; set; }
        public int Quantity { get; set; }
    }
}
