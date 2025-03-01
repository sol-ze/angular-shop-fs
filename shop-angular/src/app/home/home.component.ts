import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from 'src/types';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private productsService: ProductsService) {}

  products: Product[] = [];

  totalRecords: number = 0;

  rows: number = 5;

  onProductOutput(product: Product) {
    console.log(product, 'Output');
  }
  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  fetchProducts(page: number, perPage: number) {
    this.productsService
      .getProducts('http://localhost:3000/clothes', { page, perPage })
      .subscribe((products: Products) => {
        this.products = products.items;
        this.totalRecords = products.total;
      });
  }
  editProduct(product: Product) {}
  deleteProduct(product: Product) {}
  addProduct(product: Product) {}

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}
