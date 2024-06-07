using InventorySystem.Service.Models;

namespace InventorySystem.Service.Interfaces
{
    public interface IAccountService
    {
        Task<ApiResponse> GetUserByIdAsync(int userId);
    }
}
