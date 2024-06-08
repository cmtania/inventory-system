using InventorySystem.Service.Interfaces;
using InventorySystem.Service.Models.DatabaseModel;
using InventorySystem.Service.Models.RequestModel;
using InventorySystem.Service.ViewModels;

namespace InventorySystem.Service.Models
{
    public class ProductModel : IProductModel
    {
        private readonly IProductRepository _productRepository;
        public ProductModel(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<ApiResponse> GetProductsAsync()
        {
            var apiResponse = new ApiResponse { IsOk =  true};
            try
            {
                var products = _productRepository.GetProducts();
                var productsVm = new List<ProductViewModel>();
                foreach (var prod in products) {
                    productsVm.Add(new ProductViewModel
                    {
                        ProductId = prod.PrdctId,
                        ProductCode = prod.PrdctCd,
                        ProductName = prod.PrdctNm,
                        ProductDescription = prod.PrdctDscrptn,
                        BrandId = prod.BrndId,
                        Brand = prod.Brnd.Label,
                        CategoryId = prod.CtgryId,
                        Category = prod.Ctgry.Label
                    });
                }

                apiResponse.Results = [productsVm];

                return apiResponse;
            }
            catch (Exception ex)
            {
                apiResponse.IsOk = false;
                var errorMessage = new ResponseMessage { Title = "GetProducts", Message = ex.Message };
                apiResponse.Messages = [errorMessage];

                return apiResponse;
            }
        }
        public async Task<ApiResponse> GetProductAsync(int productId)
        {
            var apiResponse = new ApiResponse { IsOk = true };
            try
            {
                var product = _productRepository.GetProduct(productId);
                var productVm= new ProductViewModel
                {
                    ProductId= product.PrdctId,
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
                var errorMessage = new ResponseMessage { Title = "Get Product", Message = ex.Message };
                apiResponse.Messages = [errorMessage];

                return apiResponse;
            }
        }
        public async Task<ApiResponse> SaveProductAsync(ProductRequest product)
        {
            var apiResponse = new ApiResponse { IsOk = true };
            try
            {
                var productModel = new TrnProduct
                {
                    PrdctId = product.ProductId,
                    PrdctCd = product.ProductCode,
                    PrdctNm = product.ProductName,
                    UntPrc = product.UnitPrice,
                    PrdctDscrptn = product.ProductDescription,
                    BrndId = product.BrandId,
                    CtgryId = product.CategoryId,
                };

                await _productRepository.SaveProduct(productModel);

                return apiResponse;
            }
            catch (Exception ex)
            {
                apiResponse.IsOk = false;
                var errorMessage = new ResponseMessage { Title = "Save Product", Message = ex.Message };
                apiResponse.Messages = [errorMessage];

                return apiResponse;
            }
        }
        public async Task<ApiResponse> UpdateProductAsync(ProductRequest product)
        {
            var apiResponse = new ApiResponse { IsOk = true };
            try
            {
                var productToUpdate = _productRepository.GetProduct(product.ProductId);
                if (productToUpdate == null) {
                    apiResponse.IsOk = false;
                    var errorMessage = new ResponseMessage { Title = "Update Product", Message = "Product not existed." };
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
                var errorMessage = new ResponseMessage { Title = "Update Product", Message = ex.Message };
                apiResponse.Messages = [errorMessage];

                return apiResponse;
            }
        }
        public async Task<ApiResponse> DeleteProductAsync(int productId)
        {
            var apiResponse = new ApiResponse { IsOk = true };
            try
            {
                var productToPurge = _productRepository.GetProduct(productId);
                if (productToPurge == null)
                {
                    apiResponse.IsOk = false;
                    var errorMessage = new ResponseMessage { Title = "Delete Product", Message = "Product not existed." };
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
                var errorMessage = new ResponseMessage { Title = "Delete Product", Message = ex.Message };
                apiResponse.Messages = [errorMessage];

                return apiResponse;
            }
        }
    }
}
