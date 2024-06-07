using InventorySystem.Service.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace InventorySystem.Service.Models
{
    public class LoginModel : ILoginModel
    {
        private readonly IConfiguration _config;
        private readonly IUserRepository _userRepository;
        public LoginModel(IConfiguration config, IUserRepository userRepository)
        {
            _config = config;
            _userRepository = userRepository;
        }

        public Task<ApiResponse> LoginAsync(LoginRequest loginRequest)
        {
            var apiResponse = new ApiResponse
            {
                IsOk = true,
            };

            try
            {
                var user = _userRepository.GetUser(loginRequest.UserName, loginRequest.Password);

                if (user == null) { 
                    apiResponse.IsOk = false;
                    var responseMessage = new ResponseMessage { Title = "Login Failed", Message = "Username or password you entered is incorrect." };
                    apiResponse.Messages = [responseMessage];

                    return Task.FromResult(apiResponse);
                }

                string token = GenerateToken();
                apiResponse.Results = [new { Token = token }];
                return Task.FromResult(apiResponse);

            }
            catch (Exception ex)
            {
                apiResponse.IsOk = false;
                var responseMessage = new ResponseMessage { Title = "Login Failed", Message = ex.Message };
                apiResponse.Messages = [responseMessage];
                return Task.FromResult(apiResponse);
            }
        }

        private string GenerateToken()
        {

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var Sectoken = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              null,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            var token = new JwtSecurityTokenHandler().WriteToken(Sectoken);

            return token;
        }
    }
}
