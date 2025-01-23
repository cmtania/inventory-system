using InventorySystem.Service.Interfaces;
using InventorySystem.Service.Models.DatabaseModel;
using Microsoft.EntityFrameworkCore;

namespace InventorySystem.Service.Repository
{
    public class BrandRepository : IBrandRepository
    {
        private readonly InventoryDBContext _dbContext;
        public BrandRepository(InventoryDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Task<List<BasBrand>> GetBrands()
        {
            var dbResult = _dbContext.BasBrands.ToListAsync();

            return dbResult;
        }

        public Task<BasBrand> GetBrandById(int brandId)
        {
            var dbResult = _dbContext.BasBrands.Where(x => x.BrndId == brandId).FirstOrDefaultAsync();

            return dbResult;
        }
    }
}
