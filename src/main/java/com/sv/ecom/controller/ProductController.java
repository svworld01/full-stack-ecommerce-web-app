package com.sv.ecom.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sv.ecom.entity.Product;
import com.sv.ecom.exception.ProductNotFoundException;
import com.sv.ecom.repository.ProductRepository;

@RestController
@CrossOrigin("http://localhost:4200")
public class ProductController {
	@Autowired
	private ProductRepository productRepository;
	@GetMapping(path="/products")
	public List<Product> getAllProducts(){
		System.out.println("All products without parameter");
		return productRepository.findAll();
	}
	@GetMapping(path="/products", params = {"page", "size"})
	public Page<Product> getAllProductsWithPagination(@RequestParam("page") int page, 
														@RequestParam("size") int size){
		System.out.println("All products with parameter");
	
		Pageable pageRequest = PageRequest.of(page, size);
		return productRepository.findAll(pageRequest);
	}
	@GetMapping(path="/products/{id}")
	public Product getProductDetails(@PathVariable Long id){
		Optional<Product> product =  productRepository.findById(id);
		if(!product.isPresent()) {
			throw new ProductNotFoundException("id -> "+id);
		}
			
		return product.get();
	
	}
	@GetMapping(path="/search/{keyword}" ,params = {"page", "size"})
	public Page<Product> searchProducts(@PathVariable String keyword, 
											@RequestParam("page") int page, 
											@RequestParam("size") int size){
		return productRepository.findProductsWithPartOfName(keyword, PageRequest.of(page, size));	
	}
	@GetMapping(path="/product-category/{id}/products" ,params = {"page", "size"})
	public Page<Product> findByCategory(@PathVariable long id, 
										@RequestParam("page") int page, 
										@RequestParam("size") int size){
		
		return productRepository.findByCategoryId(id, PageRequest.of(page, size));
	}
}
