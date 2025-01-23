using InventorySystem.Service.Interfaces;
using InventorySystem.Service.Models;
using InventorySystem.Service.ViewModels;

namespace InventorySystem.Service.Services
{
    public class BrandService : IBrandService
    {
        private readonly IBrandRepository _brandRepository;
        public BrandService(IBrandRepository brandRepository)
        {
            _brandRepository = brandRepository;
        }

        public async Task<ApiResponse> GetBrandsAsync()
        {
            var apiResponse = new ApiResponse { IsOk = true };
            try
            {
                var brands = await _brandRepository.GetBrands();

                var brandsVm = new List<BrandViewModel>();

                foreach (var brand in brands)
                {
                    brandsVm.Add(new BrandViewModel
                    {
                        BrandId = brand.BrndId,
                        BrandCode = brand.BrndCd,
                        Label = brand.Label,
                        Remarks = brand.Rmrks
                    });
                }
                apiResponse.Results = [brandsVm];

                return apiResponse;
            }
            catch (Exception ex)
            {
                apiResponse.IsOk = false;
                apiResponse.Messages = [new ResponseMessage { Title = "Error", Message = ex.Message }];
                return apiResponse;
            }
        }

        public async Task<ApiResponse> GetBrandByIdAsync(int brandId)
        {
            var apiResponse = new ApiResponse { IsOk = true };
            try
            {
                var brand = await _brandRepository.GetBrandById(brandId);
                apiResponse.Results = [brand];

                return apiResponse;
            }
            catch (Exception ex)
            {
                apiResponse.IsOk = false;
                apiResponse.Messages = [new ResponseMessage { Title = "Error", Message = ex.Message }];
                return apiResponse;
            }
        }
    }
}
