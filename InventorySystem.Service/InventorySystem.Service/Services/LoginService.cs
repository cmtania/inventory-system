using InventorySystem.Service.Interfaces;
using InventorySystem.Service.Models;

namespace InventorySystem.Service.Services
{
    public class LoginService : ILoginService
    {
        private readonly ILoginModel _loginModel;
        public LoginService(ILoginModel loginModel)
        {
            _loginModel = loginModel;
        }

        public async Task<ApiResponse> LoginAsync(LoginRequest request)
        {
            return await _loginModel.LoginAsync(request);
        }

    }
}
