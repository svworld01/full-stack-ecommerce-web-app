import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = "http://localhost:8080/product-categories";

  constructor(private httpClient:HttpClient) { 

  }
  getCategoryList():Observable<ProductCategory[]>{
    return this.httpClient.get<ProductCategory[]>(this.url).pipe(map(result=>result));
  }
}
