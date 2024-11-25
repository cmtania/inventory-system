export class ProductModel {
    ProductId: number;
    ProductCode: string;
    ProductName: string;
    ProductDescription: string;
    BrandId: number;
    Brand: string;
    CategoryId: number;
    Category: string;

    constructor(
        productId: number,
        productCode: string,
        productName: string,
        productDescription: string,
        brandId: number,
        brand: string,
        categoryId: number,
        category: string
    ){
    this.ProductId = productId;
    this.ProductCode = productCode;
    this.ProductName = productName;
    this.ProductDescription = productDescription;
    this.BrandId = brandId;
    this.Brand = brand;
    this.CategoryId = categoryId;
    this.Category = category;
    }
}