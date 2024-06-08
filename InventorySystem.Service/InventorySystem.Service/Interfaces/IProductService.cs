using InventorySystem.Service.Models;
using System.Threading.Tasks;

namespace InventorySystem.Service.Interfaces
{
    public interface IProductService
    {
        Task<ApiResponse> GetProductsAsync();
    }
}
