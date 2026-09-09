using InventorySystem.Service.Models.DatabaseModel;

namespace InventorySystem.Service.Interfaces
{
    public interface IPaymentTypeRepository
    {
        Task<List<BasPaymentType>> GetPaymentTypeList();
    }
}
