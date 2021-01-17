import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = "http://localhost:8080/products";
  
  constructor(private httpClient:HttpClient) { 

  }

  getProduct(productID:number):Observable<Product>{
    const productUrl:string = `${this.url}/${productID}`;
    return this.httpClient.get<Product>(productUrl);
  }
  
  private getProducts(searchURL: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(searchURL).pipe(map(result => result));
  }


  getProductList(categoryID:number):Observable<Product[]>{
    const searchURL = `http://localhost:8080/product-category/${categoryID}/products`;
    console.log(searchURL);
    return this.getProducts(searchURL);
  }
  

  searchProducts(keyword:string):Observable<Product[]>{
    const searchURL = `http://localhost:8080/search/${keyword}`;
    console.log(searchURL);
    return this.getProducts(searchURL);
  }

}
