using InventorySystem.Service.Models;
using InventorySystem.Service.Models.DatabaseModel;
using InventorySystem.Service.Models.RequestModel;
using System.Threading.Tasks;

namespace InventorySystem.Service.Interfaces
{
    public interface IProductModel
    {
        Task<ApiResponse> GetProductsAsync();
        Task<ApiResponse> GetProductAsync(int productId);
        Task<ApiResponse> SaveProductAsync(ProductRequest product);
        Task<ApiResponse> UpdateProductAsync(ProductRequest product);
        Task<ApiResponse> DeleteProductAsync(int productId);
    }
}
