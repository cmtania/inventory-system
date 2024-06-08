export class ResponseObject {
    IsOk: boolean;
    Message: any[];
    Results: any[];

    constructor(isOk: boolean, results: any[], messages: any[]){
        this.IsOk = isOk;
        this.Results = results;
        this.Message = messages;
    }

    getApiResponse(){
        return {
            IsOk: this.IsOk,
            Results: this.Results,
            Messsages: this.Message
        }
    }
}