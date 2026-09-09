using InventorySystem.Service.Models;
using InventorySystem.Service.Models.RequestModel;

namespace InventorySystem.Service.Interfaces
{
    public interface IBrandService
    {
        Task<ApiResponse> GetBrandsAsync();
        Task<ApiResponse> GetBrandByIdAsync(int brandId);
        Task<ApiResponse> SaveBrandAsync(SaveBrandRequestDto request);
    }
}
