using InventorySystem.Service.Interfaces;
using InventorySystem.Service.Services;
using Microsoft.AspNetCore.Mvc;

namespace InventorySystem.Service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentTypeController : ControllerBase
    {
        private readonly IPaymentTypeService _paymentTypeService;
        public PaymentTypeController(IPaymentTypeService paymentTypeService)
        {
            _paymentTypeService = paymentTypeService;
        }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> GetPaymentTypeList() {
            var paymentTypes = await _paymentTypeService.GetPaymentTypesAsync();

            return Ok(paymentTypes);
        }

    }
}
