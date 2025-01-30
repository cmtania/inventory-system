using InventorySystem.Service.Interfaces;
using InventorySystem.Service.Services;
using Microsoft.AspNetCore.Mvc;

namespace InventorySystem.Service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [Route("getcategory")]
        [HttpGet]
        public async Task<IActionResult> GetCategoriessAsync()
        {
            var categories = await _categoryService.GetCategoriesAsync();

            return Ok(categories);
        }

        [Route("getcategory/{categoryId}")]
        [HttpGet]
        public async Task<IActionResult> GetBrandByIdAsync(int categoryId)
        {
            var category = await _categoryService.GetCategoryByIdAsync(categoryId);

            return Ok(category);
        }

    }
}
