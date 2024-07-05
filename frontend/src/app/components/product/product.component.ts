import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NavbarComponent, CommonModule, LoadingComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  loading: boolean = true;
  product: Product | null = null;
  quantity = 1;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      console.log("Product id:p",productId);
      this.productService.getProduct(productId).subscribe(response => {
        if (response.success && response.data) {
          console.log("Product:p",response.data);
          this.product = response.data;
          console.log("Product:",this.product);
        }
      });
    }
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }

  changeQuantity(change: number): void {
    this.quantity += change;
    this.quantity = Math.max(1, this.quantity);
  }
}
