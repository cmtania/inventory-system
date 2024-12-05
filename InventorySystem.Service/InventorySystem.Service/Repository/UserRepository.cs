using InventorySystem.Service.Interfaces;
using InventorySystem.Service.Models;
using InventorySystem.Service.Models.DatabaseModel;
using Microsoft.EntityFrameworkCore;

namespace InventorySystem.Service.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly InventoryDBContext _dbContext;
        public UserRepository(InventoryDBContext dbContext) {
            _dbContext = dbContext;
        }

        public Task<TrnUser> GetUser(string username, string password)
        {
            var dbResult = _dbContext.TrnUsers.Where(x => (x.UsrNm == username || x.Email == username) && x.Pswrd == password ).FirstOrDefaultAsync();

            return dbResult;
        }

        public TrnUser GetUserById(int userId) 
        { 
            var dbResult = _dbContext.TrnUsers.Where(x => x.UsrId == userId).FirstOrDefault();

            return dbResult;
        }
    }
}
