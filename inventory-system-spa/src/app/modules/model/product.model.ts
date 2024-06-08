export class ProductModel {
    ProductId: number;
    ProductCode: string;
    ProductName: string;
    ProductDescription: string;
    Brand: string;
    Category: string;

    constructor(
        productId: number,
        productCode: string,
        productName: string,
        productDescription: string,
        brand: string,
        category: string
    ){
    this.ProductId = productId;
    this.ProductCode = productCode;
    this.ProductName = productName;
    this.ProductDescription = productDescription;
    this.Brand = brand;
    this.Category = category;
    }
}