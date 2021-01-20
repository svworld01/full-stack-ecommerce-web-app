import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../common/cart-item';
import { Product } from '../common/product';
import { CartServiceService } from '../service/cart-service.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product!:Product;
  constructor(private route:ActivatedRoute, private productService:ProductService, private cartService:CartServiceService) { }

  ngOnInit(): void {
    this.listProductDetails();
  }
  listProductDetails(){
    const productID:number = +this.route.snapshot.params.id;
    this.productService.getProduct(productID).subscribe(
      data=>{
        this.product = data;
      }
    );
  }

  addToCart(){
    console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`);
    const  theCartItem = new CartItem(this.product);
    this.cartService.addToCartItem(theCartItem);
  }
}
