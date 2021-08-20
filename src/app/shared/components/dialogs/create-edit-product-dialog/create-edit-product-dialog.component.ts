import { Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductModel } from 'src/app/models/product.mode';
import { SweetAlertService } from 'src/app/services/dialogs.service';
import { ProductService } from 'src/app/services/product.service';
import { ResponsiveService } from 'src/app/services/responsive.service';


export interface DialogInput {
  title:string;
  confirmButtonText:string;
  isEdit:boolean;
  content:Partial<ProductModel>;
}

@Component({
  selector: 'app-create-edit-product-dialog',
  templateUrl: './create-edit-product-dialog.component.html',
  styleUrls: ['./create-edit-product-dialog.component.scss']
})
export class CreateEditProductDialogComponent implements OnInit {

  form:FormGroup;  

  constructor(
    private readonly _fb:FormBuilder,
    public dialogRef: MatDialogRef<CreateEditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogInput,
    private readonly _responsiveService:ResponsiveService,
    private readonly _productService:ProductService,
    private readonly _sweetAlertService:SweetAlertService) {

    this.dialogRef.disableClose = true;
    const productEdit = this.data.isEdit ? this.data.content : null;

    this.form = this._fb.group({
      id:[{ value:productEdit?.id, disabled:true }],
      name:[productEdit?.name, Validators.required],
      price:[productEdit?.price, Validators.required],
      company:[productEdit?.company, Validators.required],
      ageRestriction:[productEdit?.ageRestriction],
      description:[productEdit?.description],
    });
  }

  ngOnInit(): void {
    this._responsiveService.getMobileSizeState().subscribe((state:BreakpointState)=>{
      if(state.breakpoints[Breakpoints.XSmall] || state.breakpoints[Breakpoints.Small])
        this.dialogRef.updateSize("80%");
    });  
  }

  onSubmit() {
    console.log(this.form.get('name').errors);
    if(this.form.invalid){
      console.error("Invalid Form");
      return;
    }
    
    const isDirty = !this.form.pristine;
    const formValues = this.form.value;
    const id = this.data?.content?.id;

    const product:Partial<ProductModel> = {
      name: formValues.name,
      description: formValues.description,
      ageRestriction: formValues.ageRestriction,
      company: formValues.company,
      price: formValues.price,
    };    
    
    if(this.data.isEdit){
      this._productService.update(id, product).subscribe(
        (data)=>{
          this.dialogRef.close(data);
        },
        error=> { 
          console.error("Something was wrong!");
          this.dialogRef.close(null);
        }
      );
    } else {
      this._productService.add(product).subscribe(
        (data)=>{
          this.dialogRef.close(data);
        },
        error=> { 
          console.error("Something was wrong!");
          this.dialogRef.close(null);
        }
      );
    }
  }

}
