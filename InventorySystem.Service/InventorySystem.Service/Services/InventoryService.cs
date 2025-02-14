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
                        ProductId = inv.PrdctId,
                        ProductName = inv.Prdct.PrdctNm,
                        Supplier = inv.Supplier,
                        Quantity = inv.Qntty,
                        UnitPrice = inv.Unit,
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
                    UnitPrice = inventory.Unit,
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
        //public async Task<ApiResponse> SaveInventoryAsync(SaveInventoryRequest inventory)
        //{
        //    var apiResponse = new ApiResponse { IsOk = true };
        //    try
        //    {
        //        var productModel = new TrnInventory
        //        {
        //            PrdctId = inventory.ProductId,
        //            Supplier = inventory.Supplier,
        //            Qntty = inventory.Quantity,
        //            Unit = inventory.UnitPrice,
        //        };

        //        await _productRepository.SaveProduct(productModel);

        //        apiResponse.Messages = [new ResponseMessage { Title = ProductConstants.TRAN_SaveProduct, Message = ProductConstants.TRAN_SaveSuccessMessage }];

        //        return apiResponse;
        //    }
        //    catch (Exception ex)
        //    {
        //        apiResponse.IsOk = false;
        //        apiResponse.Messages = [new ResponseMessage { Title = ProductConstants.TRAN_SaveProduct, Message = ex.InnerException.Message }];

        //        return apiResponse;
        //    }
        //}
        //public async Task<ApiResponse> UpdateProductAsync(ProductRequest product)
        //{
        //    var apiResponse = new ApiResponse { IsOk = true };
        //    try
        //    {
        //        var productToUpdate = await _productRepository.GetProduct(product.ProductId);
        //        if (productToUpdate == null)
        //        {
        //            apiResponse.IsOk = false;
        //            var errorMessage = new ResponseMessage { Title = ProductConstants.TRAN_UpdateProduct, Message = ProductConstants.TRAN_ProductIsMissing };
        //            apiResponse.Messages = [errorMessage];

        //            return apiResponse;
        //        }
        //        productToUpdate.PrdctCd = product.ProductCode;
        //        productToUpdate.PrdctNm = product.ProductName;
        //        productToUpdate.UntPrc = product.UnitPrice;
        //        productToUpdate.PrdctDscrptn = product.ProductDescription;
        //        productToUpdate.BrndId = product.BrandId;
        //        productToUpdate.CtgryId = product.CategoryId;
        //        productToUpdate.UpdtDt = DateTime.Now;
        //        productToUpdate.UpdtBy = "User";

        //        await _productRepository.UpdateProduct(productToUpdate);

        //        return apiResponse;
        //    }
        //    catch (Exception ex)
        //    {
        //        apiResponse.IsOk = false;
        //        var errorMessage = new ResponseMessage { Title = ProductConstants.TRAN_UpdateProduct, Message = ex.InnerException.Message };
        //        apiResponse.Messages = [errorMessage];

        //        return apiResponse;
        //    }
        //}
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
