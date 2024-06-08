using InventorySystem.Service.Interfaces;
using InventorySystem.Service.Models;
using System.Threading.Tasks;

namespace InventorySystem.Service.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductModel _productModel;
        public ProductService(IProductModel productModel)
        {
            _productModel = productModel;
        }

        public async Task<ApiResponse> GetProductsAsync()
        {
            return await _productModel.GetProductsAsync();
        }
    }
}
