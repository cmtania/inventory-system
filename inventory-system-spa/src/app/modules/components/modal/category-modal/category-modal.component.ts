import { Component, ElementRef, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormUtils } from '../../../utils/form.utils';
import { BrandModel } from '../../../model/brand.model';
import { SubSink } from 'subsink';
import { CategoryModel } from '../../../model/category.model';
import { ResponseObject } from '../../../model/response.object';
import { finalize, take, tap } from 'rxjs';
import { Store } from '@ngxs/store';
import { HideSpinner, ShowSpinner } from '../../../state-management/actions/spinner.action';
import { ToastService } from '../../../shared/toast/toast.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category-modal',
  standalone: false,
  templateUrl: './category-modal.component.html',
  styleUrl: './category-modal.component.scss'
})
export class CategoryModalComponent implements OnInit, OnDestroy {
  categoryForm: FormGroup;
  title?: string;
  closeBtnName?: string;
  saveBtnName?: string;
  formUtils = FormUtils;
  brandList = new Array<BrandModel>();
  categoryList = new Array<CategoryModel>();


  isUpdate: boolean = false;

  subsink = new SubSink();

  // TODO: make it dynamic
  @ViewChild('toastTemplate') toastTemplate!: TemplateRef<any>;
  toastMessage: string = "";
  
  constructor(private fb: FormBuilder,
              private readonly _categoryService: CategoryService,
              private readonly _toastService: ToastService,
              private readonly _store: Store,
              public bsModalRef: BsModalRef){
      this.categoryForm = this.fb.group({
        CategoryCode: ['', [Validators.required, Validators.minLength(5)]],
        Label: ['', [Validators.required, Validators.minLength(5)]],
        Description: ['', [Validators.required]],
      });
  }
  
  ngOnInit(){
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      console.log(this.categoryForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  // Utility method to check if a control is invalid and touched
  isInvalid(controlName: string): boolean {
    const control = this.categoryForm.get(controlName);

    return control ? control.invalid && control.touched : false;
  }

  saveCategory(){
    if(this.isUpdate){
      // TODO: update product

      return;
    }

    this.createCategory();
  }

  private createCategory(): void {
    this._store.dispatch(new ShowSpinner());
    const newCategory = {
      CategoryCode: this.categoryForm.get("CategoryCode")?.value,
      Label: this.categoryForm.get("Label")?.value,
      Description: this.categoryForm.get("Description")?.value,
    }

    this._categoryService.addCategory(newCategory).pipe(
      take(1),
      tap((resp: ResponseObject) => {
        if (resp && resp.IsOk) {
          console.log("saved");
          this.bsModalRef.hide();

          this.toastMessage = "Saved successfully.";
          this._toastService.show(this.toastTemplate,"SUCCESS");

          return;
        }

        this.toastMessage = "An error occurred while saving the brand.";
        this._toastService.show(this.toastTemplate,"ERROR");
      }),
      finalize(() => {
          this._store.dispatch(new HideSpinner());
      })
    ).subscribe();
  }



  ngOnDestroy(){
    console.log("modal component destroy");
    this.subsink.unsubscribe();
    this.categoryForm.reset();
  }

}
