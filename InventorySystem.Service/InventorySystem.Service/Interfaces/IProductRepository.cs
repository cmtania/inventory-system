using InventorySystem.Service.Models.DatabaseModel;

namespace InventorySystem.Service.Interfaces
{
    public interface IProductRepository
    {
        Task<List<TrnProduct>> GetProducts();
        Task<TrnProduct> GetProduct(int productId);
        Task SaveProduct(TrnProduct product);
        Task UpdateProduct(TrnProduct product);
        Task DeleteProduct(TrnProduct product);
    }
}
