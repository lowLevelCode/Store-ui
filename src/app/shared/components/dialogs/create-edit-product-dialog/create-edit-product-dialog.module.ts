import { NgModule } from '@angular/core';
import { CreateEditProductDialogComponent } from './create-edit-product-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMaskModule } from 'ngx-mask';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
      MatDialogModule, 
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      FormsModule, ReactiveFormsModule,
      FlexLayoutModule,
      NgxMaskModule,
      CommonModule
    ],
    exports: [CreateEditProductDialogComponent],
    declarations: [
    CreateEditProductDialogComponent
  ],
})
export class CreateEditProductDialogModule { }
