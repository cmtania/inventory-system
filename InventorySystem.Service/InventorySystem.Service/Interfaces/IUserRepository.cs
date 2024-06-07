using InventorySystem.Service.Models;
using InventorySystem.Service.Models.DatabaseModel;

namespace InventorySystem.Service.Interfaces
{
    public interface IUserRepository
    {
        string GetUser(LoginModel login);
        TrnUser GetUserById(int userId);
        TrnUser GetUser(string username, string password);
    }
}
