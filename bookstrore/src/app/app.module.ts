import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SliderComponent } from './slider/slider.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SubcategoryMenuComponent } from './subcategory-menu/subcategory-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    ProductListComponent,
    SubcategoryMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
