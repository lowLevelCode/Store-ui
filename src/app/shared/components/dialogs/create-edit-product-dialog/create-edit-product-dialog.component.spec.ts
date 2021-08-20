import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditProductDialogComponent } from './create-edit-product-dialog.component';

describe('CreateEditProductDialogComponent', () => {
  let component: CreateEditProductDialogComponent;
  let fixture: ComponentFixture<CreateEditProductDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditProductDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
