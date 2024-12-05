using InventorySystem.Service.Models;
using InventorySystem.Service.Models.DatabaseModel;

namespace InventorySystem.Service.Interfaces
{
    public interface IUserRepository
    {
        TrnUser GetUserById(int userId);
        Task<TrnUser> GetUser(string username, string password);
    }
}
