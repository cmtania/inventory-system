using InventorySystem.Service.Interfaces;
using InventorySystem.Service.Models.DatabaseModel;
using Microsoft.EntityFrameworkCore;

namespace InventorySystem.Service.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly InventoryDBContext _dbContext;
        public CategoryRepository(InventoryDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Task<List<BasCategory>> GetCategories()
        {
            var dbResult = _dbContext.BasCategories.ToListAsync();

            return dbResult;
        }

        public Task<BasCategory> GetCategoryById(int categoryId)
        {
            var dbResult = _dbContext.BasCategories.Where(x => x.CtgryId == categoryId).FirstOrDefaultAsync();

            return dbResult;
        }
    }
}
