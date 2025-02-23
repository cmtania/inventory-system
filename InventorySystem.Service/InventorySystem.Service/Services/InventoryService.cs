using InventorySystem.Service.Constants;
using InventorySystem.Service.Interfaces;
using InventorySystem.Service.Models;
using InventorySystem.Service.Models.DatabaseModel;
using InventorySystem.Service.Models.RequestModel;
using InventorySystem.Service.ViewModels;

namespace InventorySystem.Service.Services
{
    public class InventoryService : IInventoryService
    {

        private readonly IInventoryRepository _inventoryRepository;
        public InventoryService(IInventoryRepository inventoryRepository)
        {
            _inventoryRepository = inventoryRepository;
        }

        public async Task<ApiResponse> ListAsync()
        {
            try
            {
                var inventories = await _inventoryRepository.GetInventoryList();
                var inventoryVm = new List<InventoryViewModel>();

                foreach (var inv in inventories)
                {
                    inventoryVm.Add(new InventoryViewModel
                    {
                        InventoryId = inv.InvId,
                        ProductId = inv.PrdctId,
                        ProductName = inv.Prdct.PrdctNm,
                        Supplier = inv.Supplier,
                        Quantity = inv.Qntty,
                        UnitPrice = inv.UntPrc,
                    });
                }

                return new ApiResponse { IsOk = true, Results = [inventoryVm] };
            }
            catch (Exception ex)
            {
                return new ApiResponse
                {
                    IsOk = false,
                    Messages = [ new ResponseMessage
                               { Title = InventoryConstants.TRAN_GetInvList,
                                  Message = ex.InnerException?.Message
                               }]
                };
            }
        }
        public async Task<ApiResponse> GetInvByIdAsync(int inventoryId)
        {
            var apiResponse = new ApiResponse { IsOk = true };
            try
            {
                var inventory = await _inventoryRepository.GetInventoryById(inventoryId);
                var inventoryVM = new InventoryViewModel
                {
                    ProductId = inventory.PrdctId,
                    ProductName = inventory.Prdct.PrdctNm,
                    Supplier = inventory.Supplier,
                    UnitPrice = inventory.UntPrc,
                    Quantity = inventory.Qntty,
                };

                return new ApiResponse{ IsOk = true, Results = [inventoryVM] };
            }
            catch (Exception ex)
            {
                return new ApiResponse
                { IsOk = false, 
                  Messages = [ new ResponseMessage
                               { Title = InventoryConstants.TRAN_GetInvById,
                                  Message = ex.InnerException?.Message
                               }]
                };
            }
        }
        public async Task<ApiResponse> SaveInventoryAsync(SaveInventoryRequest inventory)
        {
            var apiResponse = new ApiResponse { IsOk = true };
            try
            {
                var inventoryModel = new TrnInventory
                {
                    PrdctId = inventory.ProductId,
                    Supplier = inventory.Supplier,
                    Qntty = inventory.Quantity,
                    UntPrc = inventory.UnitPrice,
                };

                await _inventoryRepository.SaveInventory(inventoryModel);

                apiResponse.Messages = [new ResponseMessage { Title = ProductConstants.TRAN_SaveProduct, Message = ProductConstants.TRAN_SaveSuccessMessage }];

                return apiResponse;
            }
            catch (Exception ex)
            {
                apiResponse.IsOk = false;
                apiResponse.Messages = [new ResponseMessage { Title = ProductConstants.TRAN_SaveProduct, Message = ex.InnerException.Message }];

                return apiResponse;
            }
        }
        public async Task<ApiResponse> UpdateInventoryAsync(SaveInventoryRequest invRequest)
        {
            var apiResponse = new ApiResponse { IsOk = true };
            try
            {
                var inventory = await _inventoryRepository.GetInventoryById(invRequest.InventoryId);
                if (inventory == null)
                {
                    apiResponse.IsOk = false;
                    var errorMessage = new ResponseMessage { Title = ProductConstants.TRAN_UpdateProduct, Message = ProductConstants.TRAN_ProductIsMissing };
                    apiResponse.Messages = [errorMessage];

                    return apiResponse;
                }
                inventory.PrdctId = invRequest.ProductId;
                inventory.Supplier = invRequest.Supplier;
                inventory.Qntty = invRequest.Quantity;
                inventory.UntPrc = invRequest.UnitPrice;
                inventory.UpdtDt = DateTime.Now;
                inventory.UpdtBy = "User";

                await _inventoryRepository.UpdateInventory(inventory);

                return apiResponse;
            }
            catch (Exception ex)
            {
                apiResponse.IsOk = false;
                var errorMessage = new ResponseMessage { Title = ProductConstants.TRAN_UpdateProduct, Message = ex.InnerException.Message };
                apiResponse.Messages = [errorMessage];

                return apiResponse;
            }
        }
        public async Task<ApiResponse> DeleteInventoryAsync(int inventoryId)
        {
            try
            {
                var invToPurge = await _inventoryRepository.GetInventoryById(inventoryId);
                if (invToPurge == null)
                {
                    return new ApiResponse
                    {
                        IsOk = true,
                        Messages = [ new ResponseMessage
                               { Title = InventoryConstants.TRAN_DeleteInv,
                                  Message = ProductConstants.TRAN_ProductIsMissing
                               }]
                    };
                }

                invToPurge.Purge = true;
                invToPurge.UpdtDt = DateTime.Now;
                invToPurge.UpdtBy = "User";

                await _inventoryRepository.DeleteInventory(invToPurge);

                return new ApiResponse { IsOk = true }; ;
            }
            catch (Exception ex)
            {
                return new ApiResponse
                {
                    IsOk = false,
                    Messages = [ new ResponseMessage
                               { Title = InventoryConstants.TRAN_DeleteInv,
                                  Message = ex.InnerException.Message
                               }]
                };
            }
        }
    }
}
