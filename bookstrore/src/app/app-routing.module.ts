import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {path: 'products',  component:ProductListComponent},
  {path:'product-category/:id/products', component:ProductListComponent},
  {path:'', component:ProductListComponent, pathMatch:'full'},
  {path:'**', redirectTo:'products', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
