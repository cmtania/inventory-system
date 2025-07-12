using InventorySystem.Service.Interfaces;
using InventorySystem.Service.Models.DatabaseModel;
using Microsoft.EntityFrameworkCore;

namespace InventorySystem.Service.Repository
{
    public class RoleRepository : IRoleRepository
    {
        private readonly InventoryDBContext _dbContext;
        public RoleRepository(InventoryDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<BasRole> GetRoleById(int roleId)
        {
            var dbResult = await _dbContext.BasRoles.Where(x => x.RlId == roleId).FirstOrDefaultAsync();

            return dbResult;
        }
    }
}
