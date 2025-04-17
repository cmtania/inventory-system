import { Component, ElementRef, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormUtils } from '../../../utils/form.utils';
import { BrandService } from '../../../services/brand.service';
import { BrandModel } from '../../../model/brand.model';
import { SubSink } from 'subsink';
import { CategoryModel } from '../../../model/category.model';
import { ResponseObject } from '../../../model/response.object';
import { finalize, take, tap } from 'rxjs';
import { Store } from '@ngxs/store';
import { HideSpinner, ShowSpinner } from '../../../state-management/actions/spinner.action';
import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-brand-modal',
  standalone: false,
  templateUrl: './brand-modal.component.html',
  styleUrl: './brand-modal.component.scss'
})
export class BrandModalComponent implements OnInit, OnDestroy {
  brandForm: FormGroup;
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
              private readonly _brandService: BrandService,
              private readonly _toastService: ToastService,
              private readonly _store: Store,
              public bsModalRef: BsModalRef){
      this.brandForm = this.fb.group({
        BrandCode: ['', [Validators.required, Validators.minLength(5)]],
        Label: ['', [Validators.required, Validators.minLength(5)]],
        Description: ['', [Validators.required]],
      });
  }
  
  ngOnInit(){
  }

  onSubmit() {
    if (this.brandForm.valid) {
      console.log(this.brandForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  // Utility method to check if a control is invalid and touched
  isInvalid(controlName: string): boolean {
    const control = this.brandForm.get(controlName);

    return control ? control.invalid && control.touched : false;
  }

  saveBrand(){
    if(this.isUpdate){
      // TODO: update product

      return;
    }

    this.createBrand();
  }

  private createBrand(): void {
    this._store.dispatch(new ShowSpinner());
    const newBrand = {
      BrandCode: this.brandForm.get("BrandCode")?.value,
      Label: this.brandForm.get("Label")?.value,
      Description: this.brandForm.get("Description")?.value,
    }

    this._brandService.addBrand(newBrand).pipe(
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
    this.brandForm.reset();
  }

}
