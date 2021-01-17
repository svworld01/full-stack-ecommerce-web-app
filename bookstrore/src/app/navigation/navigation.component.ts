import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory } from '../common/product-category';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  categories:ProductCategory[] = [];
  constructor(private service:CategoryService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.getCategoryList();
    
  }
  getCategoryList(){
    this.service.getCategoryList().subscribe(data=>{
      this.categories= data;
    });
  }
  doSearch(keyword:string){
    console.log(`search/${keyword}`);
    this.router.navigateByUrl(`search/${keyword}`);
  }
}
