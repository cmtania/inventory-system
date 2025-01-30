using InventorySystem.Service.Models;
using InventorySystem.Service.Models.DatabaseModel;
using InventorySystem.Service.Models.RequestModel;
using System.Threading.Tasks;

namespace InventorySystem.Service.Interfaces
{
    public interface IProductService
    {
        Task<ApiResponse> GetProductsAsync();
        Task<ApiResponse> GetProductByIdAsync(int productId);
        Task<ApiResponse> SaveProductAsync(SaveProductRequest product);
        Task<ApiResponse> UpdateProductAsync(ProductRequest product);
        Task<ApiResponse> DeleteProductAsync(int productId);
    }
}
