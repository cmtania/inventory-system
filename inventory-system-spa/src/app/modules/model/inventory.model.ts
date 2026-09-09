export class InventoryModel {
    InventoryId: number;
    ProductId: string;
    Supplier: string;
    Quantity: number;
    UnitPrice: number;
    ProductName: string;
    ProductDescription: string;
    ProductCode: string;
    Brand: string;
    Category: string;

    constructor(
        inventoryId: number,
        productId: string,
        productName: string,
        productDescription: string,
        supplier: string,
        quantity: number,
        unitPrice: number,
        productCode: string,
        brand: string,
        category: string
    ){
    this.InventoryId = inventoryId;
    this.ProductId = productId;
    this.ProductName = productName;
    this.ProductDescription = productDescription;
    this.Supplier = supplier;
    this.Quantity = quantity;
    this.UnitPrice = unitPrice;
    this.ProductCode = productCode;
    this.Brand = brand;
    this.Category = category;
    }
}