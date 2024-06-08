using InventorySystem.Service.Models;
using System.Threading.Tasks;

namespace InventorySystem.Service.Interfaces
{
    public interface IProductModel
    {
        Task<ApiResponse> GetProductsAsync();
    }
}
