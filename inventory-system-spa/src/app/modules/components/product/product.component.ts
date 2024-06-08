import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { SubSink } from 'subsink';
import { ProductModel } from '../../model/product.model';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService){
  }

  subsink = new SubSink();
  productList = new Array<ProductModel>();

  ngOnInit(){
    this.subsink.add(
      this.getProducts()
    );
  }

  getProducts() {
    return this.productService.getProducts().subscribe(
      (response) => {
        if (response.IsOk) {
          this.productList = response.Results[0];
          return;
        } 
      },
    );
  }

  ngOnDestroy(){
    this.subsink.unsubscribe();
  }
}
