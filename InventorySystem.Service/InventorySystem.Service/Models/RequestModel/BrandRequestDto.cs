namespace InventorySystem.Service.Models.RequestModel
{
    public class SaveBrandRequestDto
    {
        public string BrandCode { get; set; }
        public string Label { get; set; }
        public string Description { get; set; }
    }

    public class UpdateBrandRequestDto
    {
        public int BrandId { get; set; }
        public string BrandCode { get; set; }
        public string Label { get; set; }
        public string Remarks { get; set; }
    }
}
