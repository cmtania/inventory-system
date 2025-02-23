export class InventoryModel {
    InventoryId: number;
    ProductId: string;
    Supplier: string;
    Quantity: number;
    UnitPrice: string;
    ProductName: string;
    ProductCode: string;
    Brand: string;
    Category: string;

    constructor(
        inventoryId: number,
        productId: string,
        productName: string,
        supplier: string,
        quantity: number,
        unitPrice: string,
        productCode: string,
        brand: string,
        category: string
    ){
    this.InventoryId = inventoryId;
    this.ProductId = productId;
    this.ProductName = productName;
    this.Supplier = supplier;
    this.Quantity = quantity;
    this.UnitPrice = unitPrice;
    this.ProductCode = productCode;
    this.Brand = brand;
    this.Category = category;
    }
}