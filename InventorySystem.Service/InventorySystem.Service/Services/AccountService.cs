using InventorySystem.Service.Interfaces;
using InventorySystem.Service.Models;

namespace InventorySystem.Service.Services
{
    public class AccountService : IAccountService
    {
        private readonly IAccountModel _accountModel;
        public AccountService(IAccountModel accountModel) {
            _accountModel = accountModel;
        }

        public async Task<ApiResponse> GetUserByIdAsync(int userId)
        {
            return await _accountModel.GetUserByIdAsync(userId);
        }
    }
}
