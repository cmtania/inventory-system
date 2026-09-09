using InventorySystem.Service.Interfaces;
using InventorySystem.Service.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InventorySystem.Service.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [Route("user")]
        [HttpGet]
        public async Task<IActionResult> GetUserByIdAsync(int userId)
        {
            var apiResponse = await _accountService.GetUserByIdAsync(userId);

            return Ok(apiResponse);
        }
    }
}
