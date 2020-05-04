

export class Item {
    public id: number;
    public name: string;
    public inventoryCode: string;
    public amount: number;
    public quantity: number;

    constructor () {
        this.quantity = 0;
    }

    fillModel( params: any) {

        if (params === undefined) {
            return;
        }
        if (params.id) {
            this.id = params.id;
        }
        if (params.name) {
            this.name = params.name;
        }
        if (params.inventoryCode) {
            this.inventoryCode = params.inventoryCode;
        }
        if (params.amount) {
            this.amount = params.amount;
        }
        if (params.quantity) {
            this.quantity = params.quantity;
        }
   }
}
   