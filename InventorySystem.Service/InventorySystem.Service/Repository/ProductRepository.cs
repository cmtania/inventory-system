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

        public List<TrnProduct> GetProducts() { 
            var products = _dbContext.TrnProducts
                            .Include(b => b.Brnd)
                            .Include(c => c.Ctgry)
                            .Where(p => p.Purge == false)
                            .ToList();

            return products;
        }

        public TrnProduct GetProduct(int productId)
        {
            var product = _dbContext.TrnProducts
                            .Include(b => b.Brnd)
                            .Include(c => c.Ctgry)
                            .Where(p => p.Purge == false)
                            .FirstOrDefault(x => x.PrdctId == productId);

            return product;
        }

        public async Task SaveProduct(TrnProduct product)
        {
            await _dbContext.AddAsync(product);
        }

        public async Task UpdateProduct(TrnProduct product)
        {
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
