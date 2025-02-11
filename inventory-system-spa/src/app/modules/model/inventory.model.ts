export class InventoryModel {
    InventoryId: number;
    ProductId: string;
    ProductName: string;
    Supplier: string;
    Quantity: number;
    UnitPrice: string;

    constructor(
        inventoryId: number,
        productId: string,
        productName: string,
        supplier: string,
        quantity: number,
        unitPrice: string
    ){
    this.InventoryId = inventoryId;
    this.ProductId = productId;
    this.ProductName = productName;
    this.Supplier = supplier;
    this.Quantity = quantity;
    this.UnitPrice = unitPrice;
    }
}