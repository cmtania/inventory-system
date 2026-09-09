export class BrandModel {
    BrandId: number;
    BrandCode: string;
    Label: string;
    Remarks: string;

    constructor(
        brandId: number,
        brandCode: string,
        label: string,
        remarks: string
    ){
    this.BrandId = brandId;
    this.BrandCode = brandCode;
    this.Label = label;
    this.Remarks = remarks;
    }
}