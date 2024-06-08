using InventorySystem.Service.Models.DatabaseModel;

namespace InventorySystem.Service.Interfaces
{
    public interface IProductRepository
    {
        List<TrnProduct> GetProducts();
        TrnProduct GetProduct(int productId);
        Task SaveProduct(TrnProduct product);
        Task UpdateProduct(TrnProduct product);
        Task DeleteProduct(TrnProduct product);
    }
}
