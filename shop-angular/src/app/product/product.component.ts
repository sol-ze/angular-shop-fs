import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-product',
  imports: [RatingModule, FormsModule, Button],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();

  editProduct() {
    this.edit.emit(this.product);
  }

  deleteProduct() {
    this.delete.emit(this.product);
  }
  ngOnInit() {
  }
}
