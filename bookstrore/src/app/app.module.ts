import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SliderComponent } from './slider/slider.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SubcategoryMenuComponent } from './subcategory-menu/subcategory-menu.component';
import {HttpClientModule} from '@angular/common/http'
import { ProductService } from './service/product.service';
import { NavigationComponent } from './navigation/navigation.component';
@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    ProductListComponent,
    SubcategoryMenuComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
