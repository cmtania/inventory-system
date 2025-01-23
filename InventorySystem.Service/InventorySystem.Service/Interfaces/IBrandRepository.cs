using InventorySystem.Service.Models.DatabaseModel;

namespace InventorySystem.Service.Interfaces
{
    public interface IBrandRepository
    {
        Task<List<BasBrand>> GetBrands();
        Task<BasBrand> GetBrandById(int brandId);
    }
}
