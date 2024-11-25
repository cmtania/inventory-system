using InventorySystem.Service.Interfaces;
using InventorySystem.Service.Models;
using InventorySystem.Service.Models.RequestModel;
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
        public async Task<ApiResponse> GetProductAsync(int productId)
        {
            return await _productModel.GetProductAsync(productId);
        }
        public async Task<ApiResponse> SaveProductAsync(ProductRequest product)
        {
            return await _productModel.SaveProductAsync(product);
        }
        public async Task<ApiResponse> UpdateProductAsync(ProductRequest product)
        {
            return await _productModel.UpdateProductAsync(product);
        }
        public async Task<ApiResponse> DeleteProductAsync(int productId)
        {
            return await _productModel.DeleteProductAsync(productId);
        }
    }
}
