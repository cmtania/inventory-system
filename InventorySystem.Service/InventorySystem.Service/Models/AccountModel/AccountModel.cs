using InventorySystem.Service.Interfaces;

namespace InventorySystem.Service.Models.AccountModel
{
    public class AccountModel : IAccountModel
    {
        private readonly IUserRepository _userRepository;
        public AccountModel(IUserRepository userRepository) {
            _userRepository = userRepository;
        }

        public async Task<ApiResponse> GetUserByIdAsync(int userId)
        {
            var apiResponse = new ApiResponse
            {
                IsOk = true,
            };
            try
            {
                var user = await _userRepository.GetUserById(userId);
                apiResponse.Results = [user];

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
