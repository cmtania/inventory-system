﻿using InventorySystem.Service.Interfaces;
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

        [Route("list")]
        [HttpGet]
        public async Task<IActionResult> GetProductsAsync()
        {
            var products = await _productService.GetProductsAsync();

            return Ok(products);
        }

        [Route("{productId}")]
        [HttpGet]
        public async Task<IActionResult> GetProductAsync(int productId)
        {
            var product = await _productService.GetProductByIdAsync(productId);

            return Ok(product);
        }

        [Route("save")]
        [HttpPost]
        public async Task<IActionResult> SaveProductAsync([FromBody] SaveProductRequest product)
        {
            var saveResponse = await _productService.SaveProductAsync(product);

            return Ok(saveResponse);
        }

        [Route("update")]
        [HttpPost]
        public async Task<IActionResult> UpdateProductAsync([FromBody] ProductRequest product)
        {
            var updateResponse = await _productService.UpdateProductAsync(product);

            return Ok(updateResponse);
        }

        [Route("delete/{productId}")]
        [HttpDelete]
        public async Task<IActionResult> UpdateProductAsync(int productId)
        {
            var deleteResponse = await _productService.DeleteProductAsync(productId);

            return Ok(deleteResponse);
        }
    }
}
