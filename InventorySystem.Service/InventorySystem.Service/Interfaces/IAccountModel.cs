using InventorySystem.Service.Models;

namespace InventorySystem.Service.Interfaces
{
    public interface IAccountModel
    {
        Task<ApiResponse> GetUserByIdAsync(int userId);
    }
}
