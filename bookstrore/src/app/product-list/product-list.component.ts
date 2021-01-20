import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../common/cart-item';
import { Product } from '../common/product';
import { CartServiceService } from '../service/cart-service.service';
import { ProductService } from '../service/product.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products:Product[] = [];
  categoryID:number  = 1;
  previousCategoryId: number = 1;
  searchMode:boolean = false;
  //properties for pageination support
  thePageNumber:number = 1;
  thePageSize:number = 5;
  theTotalNumberOfElements:number = 0;
  constructor(private cartService:CartServiceService, private productService:ProductService, private routes:ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this.routes.paramMap.subscribe(()=>{
      this.listProducts();
    });
    
  }

  addProductToCart(theProduct:Product){
      console.log(`Adding to cart : ${theProduct.name}, ${theProduct.unitPrice}`);
      //add to cart
      const theCartItem = new CartItem(theProduct);
      this.cartService.addToCartItem(theCartItem);
  }
  listProducts():void{
    this.searchMode = this.routes.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProducts();
    }else{
      this.handleListProducts();
    }
  }
  handleListProducts(){
    const hasID:boolean = this.routes.snapshot.paramMap.has('id');
    if(hasID){
      this.categoryID = +this.routes.snapshot.params.id;
      console.log(this.categoryID);
    }else{
      this.categoryID = 1;
    }
    
    if(this.previousCategoryId!= this.categoryID){
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.categoryID;
    console.log(`Category ID ${this.categoryID} and Page Number ${this.thePageNumber}`);
/*
    this.productService.getProductList(this.categoryID).subscribe(data=>{
      this.products= data;
    });
*/
    this.productService.getProductListPaginate(this.thePageNumber - 1,
                                              this.thePageSize, 
                                              this.categoryID)
                                              .subscribe(data=>{
                                                this.products = data.content;
                                                this.thePageSize = data.size;
                                                this.theTotalNumberOfElements = data.totalElements;
                                                this.thePageNumber = data.number + 1;
                                              });
  }
  
  handleSearchProducts(){
    const keyword:string = this.routes.snapshot.params.keyword;
    this.productService.searchProductsWithKeyword(keyword,this.thePageNumber-1, this.thePageSize)
    .subscribe(data=>{
      this.products = data.content;
      this.thePageSize = data.size;
      this.theTotalNumberOfElements = data.totalElements;
      this.thePageNumber = data.number + 1;
    });
  }
  updatePageSize(size:string){
    this.thePageSize = +size;
    this.thePageNumber = 1;
    this.listProducts();
  }
}
