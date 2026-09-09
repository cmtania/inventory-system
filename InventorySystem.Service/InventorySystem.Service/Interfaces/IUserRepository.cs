using InventorySystem.Service.Models.DatabaseModel;

namespace InventorySystem.Service.Interfaces
{
    public interface IUserRepository
    {
        Task<TrnUser> GetUserById(int userId);
        Task<TrnUser> GetUser(string username, string password);
    }
}
