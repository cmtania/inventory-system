using InventorySystem.Service.Models.DatabaseModel;

namespace InventorySystem.Service.Interfaces
{
    public interface ICategoryRepository
    {
        Task<List<BasCategory>> GetCategories();
        Task<BasCategory> GetCategoryById(int categoryId);
    }
}
