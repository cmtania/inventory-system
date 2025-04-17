using InventorySystem.Service.Models;
using InventorySystem.Service.Models.RequestModel;

namespace InventorySystem.Service.Interfaces
{
    public interface ICategoryService
    {
        Task<ApiResponse> GetCategoriesAsync();
        Task<ApiResponse> GetCategoryByIdAsync(int categoryId);
        Task<ApiResponse> SaveCategoryAsync(SaveCategoryRequestDto request);
    }
}
