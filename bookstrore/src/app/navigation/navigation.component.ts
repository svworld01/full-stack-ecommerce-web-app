import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCategory } from '../common/product-category';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  categories:ProductCategory[] = [];
  constructor(private service:CategoryService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getCategoryList();
    
  }
  getCategoryList(){
    this.service.getCategoryList().subscribe(data=>{
      this.categories= data;
    });
  }
}
