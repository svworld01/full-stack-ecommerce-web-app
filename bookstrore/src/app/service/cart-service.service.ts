import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { isTemplateExpression } from 'typescript';
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
    this.suscribeTotals(totalPrice, totalQuantity);
  }
  suscribeTotals(totalPrice:number, totalQuantity:number){
      //publish the new values... all subscribers will receive the new data
      this.totalPrice.next(totalPrice);
      this.totalQuantity.next(totalQuantity);
      //log cart data just ford debugging
      this.logCartData(totalPrice, totalQuantity);
  }
  reduceTotalsWith(price:number, quantity:number){
    let totalPrice:number = 0;
    let totalQuantity:number = 0;
    this.totalPrice.subscribe(data=>totalPrice = data);
    this.totalPrice.subscribe(data=>totalQuantity = data);
    this.suscribeTotals(totalPrice - price, totalQuantity - quantity);
  }
  //remove item from cart
  removeItem(cartItem:CartItem){
    let priceForReduce:number  = cartItem.quantity;
    let quantityForReduce:number = cartItem.unitPrice*cartItem.quantity;
    this.reduceTotalsWith(priceForReduce, quantityForReduce);
    let  index:number = 0;
    for(let item of this.cartItems){
      if(item.id === cartItem.id){
        this.cartItems.splice(index, 1);
      }
    }
   
  }

  decrementItemQuntity(cartItem:CartItem){
    let priceForReduce:number  = cartItem.unitPrice;
    let quantityForReduce:number = 1;
    if(cartItem.quantity > 1){
      for(let item of this.cartItems){
        if(item.id === cartItem.id){
          item.quantity--;
          break;
        }
      }
    }
    this.reduceTotalsWith(priceForReduce, quantityForReduce);
  }

  incrementItemQuntity(cartItem:CartItem){
   
      for(let item of this.cartItems){
        if(item.id == cartItem.id){
          item.quantity++;
        }
      }
   
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
