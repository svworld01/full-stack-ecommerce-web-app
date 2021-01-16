import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../common/product';
import { ProductService } from '../service/product.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products:Product[] = [];
  categoryID!:number;
  constructor(private productService:ProductService, private routes:ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this.routes.paramMap.subscribe(()=>{
      this.listProducts();
    });
    
  }
  listProducts():void{
    const hasID:boolean = this.routes.snapshot.paramMap.has('id');
    if(hasID){
      this.categoryID = +this.routes.snapshot.params.id;
      console.log(this.categoryID);
    }else{
      this.categoryID = 1;
    }
    
    this.productService.getProductList(this.categoryID).subscribe(data=>{
      this.products= data;
    });

  }
}
