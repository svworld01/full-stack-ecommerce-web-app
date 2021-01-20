import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory } from '../common/product-category';
import { CartServiceService } from '../service/cart-service.service';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  categories:ProductCategory[] = [];
  constructor(private service:CategoryService, private route:ActivatedRoute, private router:Router, private cartService:CartServiceService) { }

  ngOnInit(): void {
    this.getCategoryList();
    this.updateCartService();
    
  }
  updateCartService() {
    //subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe( data => this.totalPrice = data);
    //subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);
  }
  getCategoryList(){
    this.service.getCategoryList().subscribe(data=>{
      this.categories= data;
    });
  }
  doSearch(keyword:string){
    console.log(`search/${keyword}`);
    this.router.navigateByUrl(`search/${keyword}`);
  }
}
