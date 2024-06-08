using InventorySystem.Service.Models.DatabaseModel;

namespace InventorySystem.Service.Interfaces
{
    public interface IProductRepository
    {
        List<TrnProduct> GetProducts();
    }
}
