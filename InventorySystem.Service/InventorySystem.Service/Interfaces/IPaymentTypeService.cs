using InventorySystem.Service.Models;

namespace InventorySystem.Service.Interfaces
{
    public interface IPaymentTypeService
    {
        Task<ApiResponse> GetPaymentTypesAsync();
    }
}
