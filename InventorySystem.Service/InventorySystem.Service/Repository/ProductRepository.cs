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
                            .ToList();

            return products;
        }

    }
}
