using InventorySystem.Service.Interfaces;
using InventorySystem.Service.Models;
using InventorySystem.Service.Repository;

namespace InventorySystem.Service.Services
{
    public class AccountService : IAccountService
    {
        private readonly IUserRepository _userRepository;
        public AccountService(IUserRepository userRepository) {
            _userRepository = userRepository;
        }

        public async Task<ApiResponse> GetUserByIdAsync(int userId)
        {
            var apiResponse = new ApiResponse{ IsOk = true };
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
