import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from 'src/types';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-edit-popup',
  imports: [
    DialogModule,
    CommonModule,
    ButtonModule,
    FormsModule,
    RatingModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.css',
})
export class EditPopupComponent {
  constructor(private formBuilder: FormBuilder) {}

  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  @Input() header!: string;

  @Output() confirm = new EventEmitter<Product>();

  @Input() product: Product = {
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  specialCharacterValidator(): ValidatorFn {
    return (control) => {
      const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
        control.value
      );

      return hasSpecialCharacter ? { hasSpecialCharacter: true } : null;
    };
  }

  ngOnChanges() {
    // Edits the current value of the form
    this.productForm.patchValue(
      this.product
      // {
      // name: this.product.name,
      // image: this.product.image,
      // price: this.product.price,
      // rating: this.product.rating
      // }
    );
  }
  productForm = this.formBuilder.group({
    name: ['', [Validators.required, this.specialCharacterValidator()]],
    image: [''],
    price: ['', [Validators.required]],
    rating: [0],
  });

  onConfirm() {

    const {name, image, price, rating} = this.productForm.value;
    this.confirm.emit({
      name: name || '',
      image: image || '',
      price: price || '',
      rating: rating || 0,

    });
    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
