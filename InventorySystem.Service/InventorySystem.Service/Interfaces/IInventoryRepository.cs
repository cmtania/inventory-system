using InventorySystem.Service.Models.DatabaseModel;

namespace InventorySystem.Service.Interfaces
{
    public interface IInventoryRepository
    {
        Task<List<TrnInventory>> GetInventoryList();
        Task<TrnInventory> GetInventoryById(int inventoryId);
        Task SaveInventory(TrnInventory inventory);
        Task UpdateInventory(TrnInventory inventory);
        Task DeleteInventory(TrnInventory inventory);
    }
}
