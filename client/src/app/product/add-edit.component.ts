import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../shared/services/products.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
})
export class AddEditComponent implements OnInit {
  productForm!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  manufactureDate = new Date();
  expiryDate = new Date();
  image: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: [''],
      productCode: ['', Validators.required],
      price: ['', [Validators.required]],
      manufactureDate: ['', Validators.required],
      expiryDate: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.getProductById();
  }

  // convenience getter for easy access to form fields
  get form() {
    return this.productForm.controls;
  }

  getProductById() {
    this.productsService.getProductById(this.id).subscribe((data: any) => {
      if (data?.data) {
        console.log('data', data.data);
        this.image = data.data.image;
        this.productForm.patchValue({
          name: data.data.name,
          productCode: data.data.productCode,
          price: data.data.price,
          manufactureDate: new Date(data.data.manufactureDate),
          expiryDate: new Date(data.data.expiryDate),
          status: data.data.status,
        });
      }
    });
  }

  changeListener($event: { target: any }): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
      console.log(myReader.result);
    };
    myReader.readAsDataURL(file);
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.productForm.invalid) {
      return;
    }
    this.loading = true;
    if (this.isAddMode) {
      this.createProduct();
    } else {
      this.updateProduct();
    }
  }

  private createProduct() {
    this.productForm.value.image = this.image;
    this.productsService.addProduct(this.productForm.value).subscribe(
      (data: any) => {
        this.toastrService.success(data.message);
        this.router.navigate(['/']);
      },
      (error) => {
        this.toastrService.error(error);
        this.loading = false;
      }
    );
  }

  private updateProduct() {
    this.productForm.value.image = this.image;
    this.productsService.editProduct(this.productForm.value, this.id).subscribe(
      (data: any) => {
        this.toastrService.success(data.message);
        this.router.navigate(['/']);
      },
      (error) => {
        this.toastrService.error(error);
        this.loading = false;
      }
    );
  }
}
