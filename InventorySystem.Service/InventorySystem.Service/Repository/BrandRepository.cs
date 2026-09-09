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

        public async Task SaveBrand(BasBrand brand) {
            brand.CrtDt = DateTime.Now;
            brand.CrtBy = "User";
            brand.UpdtDt = DateTime.Now;
            brand.UpdtBy = "User";
            brand.Purge = false;
            await _dbContext.AddAsync(brand);

            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateBrand(BasBrand brand)
        {
            _dbContext.Update(brand);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteBrand(BasBrand brand)
        {
            brand.Purge = true;
            brand.UpdtDt = DateTime.Now;
            brand.UpdtBy = "User";
            _dbContext.Update(brand);

            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<BasBrand>> GetBrands()
        {
            var dbResult = await _dbContext.BasBrands.ToListAsync();

            return dbResult;
        }

        public async Task<BasBrand> GetBrandById(int brandId)
        {
            var dbResult = await _dbContext.BasBrands.Where(x => x.BrndId == brandId).FirstOrDefaultAsync();

            return dbResult;
        }
    }
}
