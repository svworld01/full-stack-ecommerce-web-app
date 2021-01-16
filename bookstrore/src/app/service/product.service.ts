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

  getProductList(categoryID:number):Observable<Product[]>{
    const searchURL = `http://localhost:8080/product-category/${categoryID}/products`;
    console.log(searchURL);
    return this.httpClient.get<Product[]>(searchURL).pipe(map(result=>result));
  }

}
