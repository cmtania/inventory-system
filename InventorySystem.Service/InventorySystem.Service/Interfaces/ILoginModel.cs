using InventorySystem.Service.Models;

namespace InventorySystem.Service.Interfaces
{
    public interface ILoginModel
    {
        Task<ApiResponse> LoginAsync(LoginRequest request);
    }
}
