using InventorySystem.Service.Interfaces;
using InventorySystem.Service.Models;
using InventorySystem.Service.ViewModels;

namespace InventorySystem.Service.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<ApiResponse> GetCategoriesAsync()
        {
            var apiResponse = new ApiResponse { IsOk = true };
            try
            {
                var categories = await _categoryRepository.GetCategories();

                var categoryVm = new List<CategoryViewModel>();

                foreach (var category in categories)
                {
                    categoryVm.Add(new CategoryViewModel
                    {
                        CategoryId = category.CtgryId,
                        CategoryCode = category.CtgryCd,
                        Label = category.Label,
                        Remarks = category.Rmrks
                    });
                }
                apiResponse.Results = [categoryVm];

                return apiResponse;
            }
            catch (Exception ex)
            {
                apiResponse.IsOk = false;
                apiResponse.Messages = [new ResponseMessage { Title = "Error", Message = ex.Message }];
                return apiResponse;
            }
        }

        public async Task<ApiResponse> GetCategoryByIdAsync(int categoryId)
        {
            var apiResponse = new ApiResponse { IsOk = true };
            try
            {
                var category = await _categoryRepository.GetCategoryById(categoryId);
                apiResponse.Results = [category];

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
