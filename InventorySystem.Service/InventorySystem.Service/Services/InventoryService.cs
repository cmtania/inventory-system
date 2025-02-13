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
            var apiResponse = new ApiResponse { IsOk = true };
            try
            {
                var inventories = await _inventoryRepository.GetList();
                var inventoryVm = new List<InventoryViewModel>();

                foreach (var inv in inventories)
                {
                    inventoryVm.Add(new InventoryViewModel
                    {
                        ProductId = inv.PrdctId,
                        ProductName = inv.PrdctNm,
                        Supplier = inv.Supplier,
                        Quantity = inv.Quantity,
                        UnitPrice = inv.UnitPrice,
                    });
                }

                apiResponse.Results = [inventoryVm];

                return apiResponse;
            }
            catch (Exception ex)
            {
                apiResponse.IsOk = false;
                apiResponse.Messages = [new ResponseMessage { Title = InventoryConstants.TRAN_GetInventory, Message = ex.Message }];

                return apiResponse;
            }
        }
        public async Task<ApiResponse> GetProductByIdAsync(int productId)
        {
            var apiResponse = new ApiResponse { IsOk = true };
            try
            {
                var product = await _productRepository.GetProduct(productId);
                var productVm = new ProductViewModel
                {
                    ProductId = product.PrdctId,
                    ProductCode = product.PrdctCd,
                    ProductName = product.PrdctNm,
                    ProductDescription = product.PrdctDscrptn,
                    UnitPrice = product.UntPrc,
                    BrandId = product.BrndId,
                    Brand = product.Brnd.Label,
                    CategoryId = product.CtgryId,
                    Category = product.Ctgry.Label
                };

                apiResponse.Results = [productVm];

                return apiResponse;
            }
            catch (Exception ex)
            {
                apiResponse.IsOk = false;
                var errorMessage = new ResponseMessage { Title = ProductConstants.TRAN_GetProduct, Message = ex.InnerException.Message };
                apiResponse.Messages = [errorMessage];

                return apiResponse;
            }
        }
        public async Task<ApiResponse> SaveProductAsync(SaveProductRequest product)
        {
            var apiResponse = new ApiResponse { IsOk = true };
            try
            {
                var productModel = new TrnProduct
                {
                    PrdctCd = product.ProductCode,
                    PrdctNm = product.ProductName,
                    UntPrc = product.UnitPrice,
                    PrdctDscrptn = product.ProductDescription,
                    BrndId = product.BrandId,
                    CtgryId = product.CategoryId,
                };

                await _productRepository.SaveProduct(productModel);

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
        public async Task<ApiResponse> UpdateProductAsync(ProductRequest product)
        {
            var apiResponse = new ApiResponse { IsOk = true };
            try
            {
                var productToUpdate = await _productRepository.GetProduct(product.ProductId);
                if (productToUpdate == null)
                {
                    apiResponse.IsOk = false;
                    var errorMessage = new ResponseMessage { Title = ProductConstants.TRAN_UpdateProduct, Message = ProductConstants.TRAN_ProductIsMissing };
                    apiResponse.Messages = [errorMessage];

                    return apiResponse;
                }
                productToUpdate.PrdctCd = product.ProductCode;
                productToUpdate.PrdctNm = product.ProductName;
                productToUpdate.UntPrc = product.UnitPrice;
                productToUpdate.PrdctDscrptn = product.ProductDescription;
                productToUpdate.BrndId = product.BrandId;
                productToUpdate.CtgryId = product.CategoryId;
                productToUpdate.UpdtDt = DateTime.Now;
                productToUpdate.UpdtBy = "User";

                await _productRepository.UpdateProduct(productToUpdate);

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
        public async Task<ApiResponse> DeleteProductAsync(int productId)
        {
            var apiResponse = new ApiResponse { IsOk = true };
            try
            {
                var productToPurge = await _productRepository.GetProduct(productId);
                if (productToPurge == null)
                {
                    apiResponse.IsOk = false;
                    var errorMessage = new ResponseMessage { Title = ProductConstants.TRAN_DeleteProduct, Message = ProductConstants.TRAN_ProductIsMissing };
                    apiResponse.Messages = [errorMessage];

                    return apiResponse;
                }

                productToPurge.Purge = true;
                productToPurge.UpdtDt = DateTime.Now;
                productToPurge.UpdtBy = "User";

                await _productRepository.DeleteProduct(productToPurge);

                return apiResponse;
            }
            catch (Exception ex)
            {
                apiResponse.IsOk = false;
                var errorMessage = new ResponseMessage { Title = ProductConstants.TRAN_DeleteProduct, Message = ex.InnerException.Message };
                apiResponse.Messages = [errorMessage];

                return apiResponse;
            }
        }
    }
}
