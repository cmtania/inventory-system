using InventorySystem.Service.Models.DatabaseModel;

namespace InventorySystem.Service.Interfaces
{
    public interface IRoleRepository
    {
        Task<BasRole> GetRoleById(int roleId);
    }
}
