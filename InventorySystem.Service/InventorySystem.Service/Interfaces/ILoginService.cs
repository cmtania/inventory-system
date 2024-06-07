using InventorySystem.Service.Models;

namespace InventorySystem.Service.Interfaces
{
    public interface ILoginService
    {
        Task<ApiResponse> LoginAsync(LoginRequest request);
    }
}
