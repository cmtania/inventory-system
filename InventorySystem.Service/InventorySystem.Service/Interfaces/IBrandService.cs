using InventorySystem.Service.Models;

namespace InventorySystem.Service.Interfaces
{
    public interface IBrandService
    {
        Task<ApiResponse> GetBrandsAsync();
        Task<ApiResponse> GetBrandByIdAsync(int brandId);
    }
}
