export class Transaction {
    Carts: Cart[];

    constructor(
        carts: Cart[]
    ){
        this.Carts = carts;
    }
}

export class Cart {
    ItemId: number;
    InventoryId: number;
    ProductId: string;
    ProductName: string;
    Quantity: number;
    UnitPrice: number;
    RowTotal: number;
    OverAllTotal: number

    constructor(
        itemId: number,
        inventoryId: number,
        productId: string,
        productName: string,
        quantity: number,
        unitPrice: number,
        RowTotal: number,
        OverAllTotal: number
    ){
        this.ItemId = itemId;
        this.InventoryId = inventoryId;
        this.ProductId = productId;
        this.ProductName = productName;
        this.Quantity = quantity;
        this.UnitPrice = unitPrice;
        this.RowTotal = RowTotal;
        this.OverAllTotal = OverAllTotal;
    }
}
