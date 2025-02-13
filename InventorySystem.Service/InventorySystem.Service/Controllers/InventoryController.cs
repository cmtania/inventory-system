using InventorySystem.Service.Interfaces;
using InventorySystem.Service.Models.RequestModel;
using Microsoft.AspNetCore.Mvc;

namespace InventorySystem.Service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InventoryController : ControllerBase
    {
        private readonly IInventoryService _inventoryService;
        public InventoryController(IInventoryService inventoryService)
        {
            _inventoryService = inventoryService;
        }

        [Route("list")]
        [HttpGet]
        public async Task<IActionResult> ListAsync()
        {
            var inventories = await _inventoryService.ListAsync();

            return Ok(inventories);
        }

        [Route("{inventoryId}")]
        [HttpGet]
        public async Task<IActionResult> GetInventoryAsync(int inventoryId)
        {
            var inventory = await _inventoryService.GetInvByIdAsync(inventoryId);

            return Ok(inventory);
        }

        [Route("save")]
        [HttpPost]
        public async Task<IActionResult> SaveInventoryAsync([FromBody] SaveInventoryRequest inventory)
        {
            var saveResponse = await _inventoryService.SaveInventoryAsync(inventory);

            return Ok(saveResponse);
        }

        [Route("update")]
        [HttpPost]
        public async Task<IActionResult> UpdateInventoryAsync([FromBody] InventoryRequest inventory)
        {
            var updateResponse = await _inventoryService.UpdateInventoryAsync(inventory);

            return Ok(updateResponse);
        }

        [Route("delete/{inventoryId}")]
        [HttpDelete]
        public async Task<IActionResult> UpdateInventoryAsync(int inventoryId)
        {
            var deleteResponse = await _inventoryService.DeleteInventoryAsync(inventoryId);

            return Ok(deleteResponse);
        }
    }
}
