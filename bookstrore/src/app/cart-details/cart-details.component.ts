import { Component, OnInit } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { CartServiceService } from '../service/cart-service.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  totalPrice:number = 0;
  totalQuantity:number = 0;
  cartItems:CartItem[]=  [];

  constructor(private cartService:CartServiceService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
    //assign cart items
    this.cartItems = this.cartService.cartItems;
    //subscribe for total amount and quantity
    this.cartService.totalPrice.subscribe(data => this.totalPrice = data);
    this.cartService.totalQuantity.subscribe(data=> this.totalQuantity = data);
    this.cartService.computeCartTotals();
  }
  incrementQuantity(cartItem:CartItem){
    this.cartService.addToCartItem(cartItem);
  }
  decrementQuantity(cartItem:CartItem){
   if(cartItem.quantity == 1){
     this.cartService.removeItem(cartItem);
     
   }else{
     this.cartService.decrementItemQuntity(cartItem);
   }
   this.listCartDetails();
  }
  removeItem(cartitem:CartItem){
    this.cartService.removeItem(cartitem);
    this.listCartDetails();
  }

  

}
