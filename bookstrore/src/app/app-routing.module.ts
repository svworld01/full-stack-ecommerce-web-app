import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {path: 'products',  component:ProductListComponent, pathMatch:'full'},
  {path: 'products/:id',  component:ProductDetailsComponent},
  {path: 'search/:keyword',  component:ProductListComponent},
  {path:'category/:id', component:ProductListComponent},
  {path:'', component:ProductListComponent, pathMatch:'full'},
  {path:'**', redirectTo:'products', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }