package com.sv.ecom.controller;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.sv.ecom.entity.Product;
import com.sv.ecom.entity.ProductCategory;
import com.sv.ecom.exception.ProductCategoryNotFoundException;
import com.sv.ecom.repository.ProductCategoryRepository;

@RestController
@CrossOrigin("http://localhost:4200")
public class ProductCategoryController {
	@Autowired
	private ProductCategoryRepository productCategoryRepo;
	
	@GetMapping(path="/product-categories")
	public List<ProductCategory> getAllCategory(){
		
		return productCategoryRepo.findAll();
	
	}
	@GetMapping(path="/product-category/{id}/products")
	public List<Product> getProductsByCategoryId(@PathVariable Long id){
		System.out.println(id);
		Optional<ProductCategory> category = productCategoryRepo.findById(id);
		if(category.isEmpty()) {
			throw new ProductCategoryNotFoundException("id - > "+id);
		}
		return category.get().getProducts();
		
	}
}
