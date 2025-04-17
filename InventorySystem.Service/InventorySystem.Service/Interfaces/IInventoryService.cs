
using InventorySystem.Service.Models;
using InventorySystem.Service.Models.DatabaseModel;
using InventorySystem.Service.Models.RequestModel;
using System.Threading.Tasks;

namespace InventorySystem.Service.Interfaces
{
    public interface IInventoryService
    {
        Task<ApiResponse> ListAsync();
        Task<ApiResponse> GetInvByIdAsync(int inventoryId);
        Task<ApiResponse> SaveInventoryAsync(SaveInventoryRequestDto inventory);
        Task<ApiResponse> UpdateInventoryAsync(SaveInventoryRequestDto inventory);
        Task<ApiResponse> DeleteInventoryAsync(int inventoryId);
    }
}
