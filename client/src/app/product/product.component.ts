import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../shared/models';
import { ProductsService } from '../shared/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: any = [];
  constructor(private poductsService: ProductsService, 
  private toastrService: ToastrService) { }
  
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    let products = {};
    this.poductsService.getProductList(products).subscribe((data: any) => {
          if(data) {
            this.products = data.data;
            this.products = this.products.map((x : any) => ({
              ...x,
              isDeleting: false
            }))
          }
    })
  }

  deleteProduct(id: any) {
    this.products.filter((x: any) => x._id == id)[0].isDeleting = true;
    this.poductsService.deleteProduct(id).subscribe((response: any) => {
        if(response){
          this.getProducts();
        }
    }, ((error) => {
       this.toastrService.error(error);
    }))
    this.products.filter((x: any) => x._id == id)[0].isDeleting = false;
  }

}
