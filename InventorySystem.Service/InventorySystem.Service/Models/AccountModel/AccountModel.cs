using InventorySystem.Service.Interfaces;

namespace InventorySystem.Service.Models.AccountModel
{
    public class AccountModel : IAccountModel
    {
        private readonly IUserRepository _userRepository;
        public AccountModel(IUserRepository userRepository) {
            _userRepository = userRepository;
        }

        public Task<ApiResponse> GetUserByIdAsync(int userId)
        {
            var apiResponse = new ApiResponse
            {
                IsOk = true,
            };
            try
            {
                var user = _userRepository.GetUserById(userId);
                apiResponse.Results = [user];

                return Task.FromResult(apiResponse);
            }
            catch (Exception ex)
            {
                apiResponse.IsOk = false;
                var responseMessage = new ResponseMessage { Title = "Error", Message = ex.Message };
                apiResponse.Messages = [responseMessage];
                return Task.FromResult(apiResponse);
            }
            
        }
    }
}
