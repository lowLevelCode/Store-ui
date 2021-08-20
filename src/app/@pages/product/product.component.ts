import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductModel } from 'src/app/models/product.mode';
import { SweetAlertService } from 'src/app/services/dialogs.service';
import { ProductService } from 'src/app/services/product.service';
import { CreateEditProductDialogComponent, DialogInput } from 'src/app/shared/components/dialogs/create-edit-product-dialog/create-edit-product-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  displayedColumns = ['id', 'name', 'ageRestriction', 'description','price', 'company', 'actions'];  
  dataSource: ProductModel[];  

  constructor(
    private readonly _productService:ProductService,
    public dialog: MatDialog,
    private readonly _sweetAlertService:SweetAlertService) {}

  ngOnInit() {
    this.init();
  }

  reload() {
    this.init();
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(CreateEditProductDialogComponent, {
      width:"40%",
      data: <DialogInput> { 
        title: 'New Product',confirmButtonText:'Save'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this._sweetAlertService.topEndMessage('Your product has been saved');
        this.init();
      }
    });
  }

  startEdit(product:ProductModel) {
    console.log({product})
    const dialogRef = this.dialog.open(CreateEditProductDialogComponent, {
      width:"40%",
      data: <DialogInput> { 
        title: 'Edit Product',confirmButtonText:'Update',
        isEdit:true,
        content: product
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this._sweetAlertService.topEndMessage('Your product has been updated');
        this.init();
      }
    });
  }

  async deleteItem(product:ProductModel) {
    const id = product.id;
    const result = await this._sweetAlertService.confirmDelete();
    if(result.isConfirmed){
      this._productService.delete(id).subscribe(
        (data)=>{
          this._sweetAlertService.topEndMessage('Your product has been deleted');
          this.init();
        },
        error => console.error("Something was wrong!")
      )
    }
  }


  public refreshTable() {
    this.init();
  }

  public init() {
    this._productService.find().subscribe((products:any[])=>{
      this.dataSource = products;
    })
  }
}
