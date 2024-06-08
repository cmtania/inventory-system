using InventorySystem.Service.Interfaces;

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
                        Brand = prod.Brnd.Label,
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
    }
}
