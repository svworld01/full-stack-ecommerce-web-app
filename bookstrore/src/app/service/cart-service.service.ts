import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  
  cartItems: CartItem[] = []; 
  totalPrice:Subject<number> = new Subject<number>();
  totalQuantity:Subject<number> = new Subject<number>();

  constructor() { }

  addToCartItem(theCartItem: CartItem){
    //check if item is alredy in the cart
    let alreadyExistsInCart:boolean = false;
    let existingCartItem!:CartItem;
    if(this.cartItems.length > 0){
      //find the item in the cart based in item id
      for(let tempCartItem of this.cartItems){
        if(tempCartItem.id === theCartItem.id){
          existingCartItem = tempCartItem;
          alreadyExistsInCart = true;
          break;
        }
      }
    }
    //if already exists increment quantity
    if(alreadyExistsInCart){
      existingCartItem.quantity++;
    }else{
      //jus add the item into cart
      this.cartItems.push(theCartItem);
    }
    //compute cart total price and quantity
    this.computeCartTotals();
    
  }

  //computing totals of cart
  computeCartTotals() {
    let totalPrice:number = 0;
    let totalQuantity:number = 0;
    for(let currentItem of this.cartItems){
      totalPrice += currentItem.quantity * currentItem.unitPrice;
      totalQuantity += currentItem.quantity;
    }
    //publish the new values... all subscribers will receive the new data
    this.totalPrice.next(totalPrice);
    this.totalQuantity.next(totalQuantity);
    //log cart data just for debugging
    this.logCartData(totalPrice, totalQuantity);
  }
  //logging data
  logCartData(totalPrice: number, totalQuantity: number) {
    console.log("Contents of Cart:");
    for(let item of this.cartItems){
      const subTotalPrice = item.unitPrice * item.quantity;
      console.log(`name: ${item.name}, quantity: ${item.quantity}, unitPrice: ${item.unitPrice}, subTotalPrice: ${subTotalPrice}`);
    }
    console.log(`total price : ${totalPrice.toFixed(2)} and total quantity : ${totalQuantity}`);
  }
}
