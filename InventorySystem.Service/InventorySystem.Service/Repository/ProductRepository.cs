using InventorySystem.Service.Interfaces;
using InventorySystem.Service.Models.DatabaseModel;
using Microsoft.EntityFrameworkCore;

namespace InventorySystem.Service.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly InventoryDBContext _dbContext;
        public ProductRepository(InventoryDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<TrnProduct>> GetProducts()
        {
            var products = await _dbContext.TrnProducts
                             .Include(b => b.Brnd)
                             .Include(c => c.Ctgry)
                             .Where(p => p.Purge == false)
                             .ToListAsync();

            return products;
        }

        public async Task<TrnProduct> GetProduct(int productId)
        {
            var product = await _dbContext.TrnProducts
                            .Include(b => b.Brnd)
                            .Include(c => c.Ctgry)
                            .Where(p => p.Purge == false)
                            .FirstOrDefaultAsync(x => x.PrdctId == productId);

            return product;
        }

        public async Task SaveProduct(TrnProduct product)
        {
            await _dbContext.AddAsync(product);

            await _dbContext.SaveChangesAsync();

        }

        public async Task UpdateProduct(TrnProduct product)
        {
            product.UpdtDt = DateTime.Now;
            _dbContext.Update(product);

            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteProduct(TrnProduct product)
        {
            product.Purge = true;
            product.UpdtDt = DateTime.Now;
            product.UpdtBy = "User";
            _dbContext.Update(product);

            await _dbContext.SaveChangesAsync();
        }

    }
}
