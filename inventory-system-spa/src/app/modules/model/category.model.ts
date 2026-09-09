export class CategoryModel {
    CategoryId: number;
    CategoryCode: string;
    Label: string;
    Remarks: string;

    constructor(
        categoryId: number,
        categoryCode: string,
        label: string,
        remarks: string
    ){
    this.CategoryId = categoryId;
    this.CategoryCode = categoryCode;
    this.Label = label;
    this.Remarks = remarks;
    }
}