using InventorySystem.Service.Constants;
using InventorySystem.Service.Interfaces;
using InventorySystem.Service.Models;
using InventorySystem.Service.Models.DatabaseModel;
using InventorySystem.Service.Models.RequestModel;
using InventorySystem.Service.Repository;
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

        public async Task<ApiResponse> SaveBrandAsync(SaveBrandRequestDto request)
        {
            var apiResponse = new ApiResponse { IsOk = true };
            try
            {
                var brand = new BasBrand
                {
                    BrndCd = request.BrandCode,
                    Label = request.Label,
                    Rmrks = request.Description
                };
                
                await _brandRepository.SaveBrand(brand);

                var brandsVm = new List<BrandViewModel>();

                return apiResponse;
            }
            catch (Exception ex)
            {
                apiResponse.IsOk = false;
                apiResponse.Messages = [new ResponseMessage { Title = "Error", Message = ex.Message }];
                return apiResponse;
            }
        }

        public async Task<ApiResponse> UpdateBrandAsync(UpdateBrandRequestDto request)
        {
            var apiResponse = new ApiResponse { IsOk = true };
            try
            {
                var brandToUpdate = await _brandRepository.GetBrandById(request.BrandId);
                if (brandToUpdate == null)
                {
                    apiResponse.IsOk = false;
                    var errorMessage = new ResponseMessage { Title = BrandConstants.TRAN_SaveBrand, Message = CommonConstants.TRAN_RecordMissing };
                    apiResponse.Messages = [errorMessage];

                    return apiResponse;
                }

                brandToUpdate.BrndCd = request.BrandCode;
                brandToUpdate.Label = request.Label;
                brandToUpdate.Rmrks = request.Remarks;
                brandToUpdate.UpdtDt = DateTime.Now;
                brandToUpdate.UpdtBy = "User";

                await _brandRepository.UpdateBrand(brandToUpdate);

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
