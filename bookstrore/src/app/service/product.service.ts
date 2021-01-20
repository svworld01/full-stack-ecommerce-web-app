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
  //search products by keyword with pagination support
  searchProductsWithKeyword(keyword:string, 
                            pageNumber:number, 
                            pageSize:number):Observable<GetProductResponse>{
    const searchURL = `http://localhost:8080/search/${keyword}?page=${pageNumber}&size=${pageSize}`;
    console.log(searchURL);
    return this.httpClient.get<GetProductResponse>(searchURL);

  }
  //product list with pagination
  getProductListPaginate(pageNumber:number, 
                          pageSize:number, 
                          categoryID:number):Observable<GetProductResponse>{
    const searchURL = `http://localhost:8080/product-category/${categoryID}/products?page=${pageNumber}&size=${pageSize}`;
    console.log(searchURL);
    return this.httpClient.get<GetProductResponse>(searchURL);
  }
  //get product by product id
  getProduct(productID:number):Observable<Product>{
    const productUrl:string = `${this.url}/${productID}`;
    return this.httpClient.get<Product>(productUrl);
  }
  //return products by  given URL
  private getProducts(searchURL: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(searchURL).pipe(map(result => result));
  }

  //get products by category id
  getProductList(categoryID:number):Observable<Product[]>{
    const searchURL = `http://localhost:8080/product-category/${categoryID}/products`;
    console.log(searchURL);
    return this.getProducts(searchURL);
  }
  
  //get Products by search keyword
  searchProducts(keyword:string):Observable<Product[]>{
    const searchURL = `http://localhost:8080/search/${keyword}`;
    console.log(searchURL);
    return this.getProducts(searchURL);
  }

}
interface GetProductResponse{
  content:Product[]; //all products
  totalPages:number; //total pages
  totalElements:number; //total elements
  number:number; //current page number
  size:number; //number of elements in one page
}
