using InventorySystem.Service.Interfaces;
using InventorySystem.Service.Models.DatabaseModel;
using Microsoft.EntityFrameworkCore;

namespace InventorySystem.Service.Repository
{
    public class InventoryRepository : IInventoryRepository
    {
        private readonly InventoryDBContext _dbContext;
        public InventoryRepository(InventoryDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<TrnInventory>> GetInventoryList()
        {
            var inventoryList = await _dbContext.TrnInventories
                             .Include(b => b.Prdct)
                             .Where(p => p.Purge == false)
                             .ToListAsync();

            return inventoryList;
        }

        public async Task<TrnInventory> GetInventoryById(int inventoryId)
        {
            var inventory = await _dbContext.TrnInventories
                            .Include(b => b.Prdct)
                            .Where(p => p.Purge == false)
                            .FirstOrDefaultAsync(x => x.InvId == inventoryId);

            return inventory;
        }

        public async Task SaveInventory(TrnInventory inventory)
        {
            await _dbContext.AddAsync(inventory);

            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateInventory(TrnInventory inventory)
        {
            inventory.UpdtDt = DateTime.Now;
            _dbContext.Update(inventory);

            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteInventory(TrnInventory inventory)
        {
            inventory.Purge = true;
            inventory.UpdtDt = DateTime.Now;
            inventory.UpdtBy = "User";
            _dbContext.Update(inventory);

            await _dbContext.SaveChangesAsync();
        }

    }
}
