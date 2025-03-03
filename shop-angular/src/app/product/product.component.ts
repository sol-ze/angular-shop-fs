import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Product } from 'src/types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { PricePipe } from '../pipes/price.pipe';
import { TruncateNamePipe } from '../pipes/truncate-name.pipe';

@Component({
  selector: 'app-product',
  imports: [
    RatingModule,
    FormsModule,
    Button,
    ConfirmPopupModule,
    PricePipe,
    TruncateNamePipe,
  ],
  providers: [ConfirmationService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  constructor(private confirmationService: ConfirmationService) {}

  @ViewChild('deleteButton') deleteButton: any;

  @Input() product!: Product;
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();

  editProduct() {
    this.edit.emit(this.product);
  }

  confirmDelete() {
    console.log('confirmDelete() product.component');

    this.confirmationService.confirm({
      target: this.deleteButton.el.nativeElement, //correct way to access the native button
      message: 'Are you sure that you want to delete this product?',
      accept: () => {
        this.deleteProduct();
      },
    });
  }
  deleteProduct() {
    console.log('emitted  product.component');
    this.delete.emit(this.product);
  }
  ngOnInit() {}
}
