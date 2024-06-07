using InventorySystem.Service.Interfaces;
using InventorySystem.Service.Models;
using Microsoft.AspNetCore.Mvc;

namespace InventorySystem.Service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _loginService;
        public LoginController(ILoginService loginService)
        {
            _loginService = loginService;
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync(LoginRequest request)
        {
            var apiResponse = await _loginService.LoginAsync(request);

            return Ok(apiResponse);
        }
    }
}
