
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
        //Task<ApiResponse> SaveInventoryAsync(SaveInventoryRequest inventory);
        //Task<ApiResponse> UpdateInventoryAsync(InventoryRequest inventory);
        Task<ApiResponse> DeleteInventoryAsync(int inventoryId);
    }
}
