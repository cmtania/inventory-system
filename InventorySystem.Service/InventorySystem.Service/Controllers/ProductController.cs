using InventorySystem.Service.Interfaces;
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
    }
}
