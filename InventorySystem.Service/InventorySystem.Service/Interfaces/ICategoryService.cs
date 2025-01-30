using InventorySystem.Service.Models;

namespace InventorySystem.Service.Interfaces
{
    public interface ICategoryService
    {
        Task<ApiResponse> GetCategoriesAsync();
        Task<ApiResponse> GetCategoryByIdAsync(int categoryId);
    }
}
