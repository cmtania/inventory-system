using InventorySystem.Service.Interfaces;
using InventorySystem.Service.Models.DatabaseModel;
using InventorySystem.Service.Repository;
using Microsoft.EntityFrameworkCore;

namespace InventorySystem.Service.Repository
{
    
    public class PaymentTypeRepository : IPaymentTypeRepository
    {
        private readonly InventoryDBContext _dbContext;
        public PaymentTypeRepository(InventoryDBContext dbContext) {
            _dbContext = dbContext;
        }

        public async Task<List<BasPaymentType>> GetPaymentTypeList()
        {
            var dbResult = await _dbContext.BasPaymentTypes
                                .Where(p => p.Purge == false)
                                .ToListAsync();

            return dbResult;
        }

  
    }
}
