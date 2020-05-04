import { Component, OnInit, ɵConsole } from '@angular/core';
import { ItemService } from '../system/item.service';
import { Item } from '../system/models/item.model';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'


@Component({
    selector: 'app-items',
    templateUrl: '../views/items.view.html'
})
export class ItemComponent implements OnInit {

    public itemList: Array<Item> = new Array<Item>();
    public itemNumber: string = '';
    public msn: string = '';
    public item: Item = new Item();
    public itemDetail: Item = new Item();
    public showNoDataItem: boolean = false;
    public showMsnNumericPos: boolean = false;
    private quantityTypeStock: string = '';
    public quantityText: string = '';
    public quantity = 0;
    public showMsnNumericQty: boolean = false;
    public showMsnName: boolean = false;
  

    ngOnInit(): void {
        this.getItems();
    }

    constructor(private cliente_serv: ItemService) {}
    
    getItems() {
        this.cliente_serv.list().subscribe(
            response => {
                this.itemList = new Array<Item>();
                response.forEach(element => {
                    const item: Item = new Item();
                    item.fillModel(element);
                    this.itemList.push(item);
                });
            }
        );
    }


    browser() {
        if (this.itemNumber === '') { 
           this.getItems();
           return;
        }

        this.cliente_serv.item(this.itemNumber).subscribe(
            response => {
                if (!response) {
                    this.showNoDataItem = true;
                    this.msn = 'No Data Found...';
                    return;
                }
                this.itemList = new Array<Item>();
                const item: Item = new Item();
                item.fillModel(response);
                this.itemList.push(item);
            }
        );
    }

    saveQtyStock() {
       
        if ( this.quantity < 0) {
            this.showMsnNumericPos = true;
            this.msn = 'Number Invalid... ';
            return;

        }
        let total = 0;
        if (this.quantityTypeStock === 'plus') {
            total = ((+this.item.quantity) + (+this.quantity));
        }
        if (this.quantityTypeStock === 'minus') {
            total = ((+this.item.quantity) - (+this.quantity));
        }

        if (total < 0) {
            this.showMsnNumericPos = true;
            this.msn = 'Number Invalid... Available Quantity Stock = ' + this.item.quantity;
            return;
        }
        this.item.quantity = total;
        document.getElementById('btnCloseModalQtyId').click();
        this.cliente_serv.update(this.item).subscribe(
            response => {
                if (response.status === '201') {
                    this.getItems();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: response.msn,
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            },
            e => {
                console.error('Status: ' + e.error);
                console.error('ERROR: ' + e.error);
            }
        );
    }

    quantityType(quantityType, itemParam) {
        this.quantity = 0;
        this.showMsnNumericPos = false;
        if (quantityType === 'plus') {
            this.quantityText = 'Deposit quantity of a specific item to stock';
        }
        if (quantityType === 'minus') {
            this.quantityText = 'Withdrawal quantity of a specific item from stock';
        }
        this.item = itemParam;
        this.quantityTypeStock = quantityType;
    }

    saveItemDetail() {
        this.showMsnNumericQty = false;

        if (this.itemDetail.name === undefined|| this.itemDetail.name === '') {
            this.showMsnName = true;
            return;
        }
    
        if ( !(/^([0-9])*$/.test('' + this.itemDetail.quantity))) {

        }

        if (!(/^([0-9])*$/.test('' + this.itemDetail.quantity)) || this.itemDetail.quantity < 0) {
            this.showMsnNumericQty = true;
            this.msn = 'Invalid Stock Quantity...';
            return;
        }
        if (this.itemDetail.amount < 0) {
            this.showMsnNumericQty = true;
            this.msn = 'Amount Invlaid...';
            return;
        }

       

        this.cliente_serv.create(this.itemDetail).subscribe(
            response => {
                if (response) {
                    document.getElementById('btnCloseModalItemDetId').click();
                    this.clearItemDetail();
                    if (response.status === '201') {
                        this.getItems();
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: response.msn,
                            showConfirmButton: false,
                            timer: 1500
                          });
                    }
                }
            },
            e => {
                Swal.fire({
                    icon: 'error',
                    title: e.error.msn
                  });
                console.error('Status: ' + e.error.error);
            }
        );
    }
    clearItemDetail() {
        this.itemDetail = new Item();
        this.showMsnNumericPos = false;
        this.showMsnNumericQty = false;
        this.showMsnName = false;
        this.quantity = 0;

    }

    deleteItem(item) {
        let msn = '';
        if ((+item.quantity) > 0) {
            msn = 'This item has stock: ' + item.quantity;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: msn,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                // eliminamos registro
                this.cliente_serv.delete(item.id).subscribe(
                    response => {
                        if (response.status === '200') {
                            this.getItems();
                            this.clearItemDetail();
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: response.msn,
                                showConfirmButton: false,
                                timer: 1500
                              });
                        }
                    }
                );
                /*Swal.fire(
                    'Deleted!',
                    'The item has been deleted.',
                    'success'
                )*/
            }
          })

    }
    updateItem(item) {
        this.clearItemDetail();
        this.itemDetail = item;
    }
}