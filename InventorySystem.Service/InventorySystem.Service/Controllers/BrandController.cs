using InventorySystem.Service.Interfaces;
using InventorySystem.Service.Services;
using Microsoft.AspNetCore.Mvc;

namespace InventorySystem.Service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BrandController : ControllerBase
    {
        private readonly IBrandService _brandService;
        public BrandController(IBrandService brandService)
        {
            _brandService = brandService;
        }

        [Route("getbrands")]
        [HttpGet]
        public async Task<IActionResult> GetProductsAsync()
        {
            var brands = await _brandService.GetBrandsAsync();

            return Ok(brands);
        }

        [Route("getbrand/{brandId}")]
        [HttpGet]
        public async Task<IActionResult> GetBrandByIdAsync(int brandId)
        {
            var brand = await _brandService.GetBrandByIdAsync(brandId);

            return Ok(brand);
        }

    }
}
