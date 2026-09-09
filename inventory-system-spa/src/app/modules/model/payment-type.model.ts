export class PaymentTypeModel {
    PaymentTypeId: number;
    PaymentCode: string;
    Label: string;
    Remarks: string;

    constructor(
        paymentTypeId: number,
        paymentCode: string,
        label: string,
        remarks: string
    ){
    this.PaymentTypeId = paymentTypeId;
    this.PaymentCode = paymentCode;
    this.Label = label;
    this.Remarks = remarks;
    }
}
