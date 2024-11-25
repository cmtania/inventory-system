using InventorySystem.Service.Interfaces;
using InventorySystem.Service.Models.RequestModel;
using Microsoft.AspNetCore.Mvc;

namespace InventorySystem.Service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [Route("getproducts")]
        [HttpGet]
        public async Task<IActionResult> GetProductsAsync()
        {
            var products = await _productService.GetProductsAsync();

            return Ok(products);
        }

        [Route("getproduct/{productId}")]
        [HttpGet]
        public async Task<IActionResult> GetProductAsync(int productId)
        {
            var product = await _productService.GetProductAsync(productId);

            return Ok(product);
        }

        [Route("saveproduct")]
        [HttpPost]
        public async Task<IActionResult> SaveProductAsync([FromBody] ProductRequest product)
        {
            var saveResponse = await _productService.SaveProductAsync(product);

            return Ok(saveResponse);
        }

        [Route("updateproduct")]
        [HttpPost]
        public async Task<IActionResult> UpdateProductAsync([FromBody] ProductRequest product)
        {
            var updateResponse = await _productService.UpdateProductAsync(product);

            return Ok(updateResponse);
        }

        [Route("deleteproduct/{productId}")]
        [HttpDelete]
        public async Task<IActionResult> UpdateProductAsync(int productId)
        {
            var deleteResponse = await _productService.DeleteProductAsync(productId);

            return Ok(deleteResponse);
        }
    }
}
