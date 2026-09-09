using InventorySystem.Service.Interfaces;
using InventorySystem.Service.Models;
using InventorySystem.Service.Repository;
using InventorySystem.Service.ViewModels;

namespace InventorySystem.Service.Services
{
    public class PaymentTypeService : IPaymentTypeService
    {
        private readonly IPaymentTypeRepository _paymentTypeRepository;
        public PaymentTypeService(IPaymentTypeRepository paymentTypeRepository) {
            _paymentTypeRepository = paymentTypeRepository;
        }

        public async Task<ApiResponse> GetPaymentTypesAsync()
        {
            var apiResponse = new ApiResponse { IsOk = true };
            try
            {
                var paymentTypes = await _paymentTypeRepository.GetPaymentTypeList();

                var paymentTypesVm = new List<PaymentTypeViewModel>();

                foreach (var pt in paymentTypes)
                {
                    paymentTypesVm.Add(new PaymentTypeViewModel
                    {
                        PaymentTypeId = pt.PymntTypId,
                        PaymentCode = pt.PymntCd,
                        Label = pt.Label,
                        Remarks = pt.Rmrks
                    });
                }
                apiResponse.Results = [paymentTypesVm];

                return apiResponse;
            }
            catch (Exception ex)
            {
                apiResponse.IsOk = false;
                apiResponse.Messages = [new ResponseMessage { Title = "Error", Message = ex.Message }];
                return apiResponse;
            }
        }
    }
}
