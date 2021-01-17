import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../common/product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product!:Product;
  constructor(private route:ActivatedRoute, private productService:ProductService) { }

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

}
