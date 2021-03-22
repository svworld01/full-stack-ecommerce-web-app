package com.sv.ecom.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sv.ecom.entity.Product;
@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{
	@Query("SELECT p FROM Product p WHERE p.name LIKE CONCAT('%',:name,'%')")
	Page<Product> findProductsWithPartOfName(@Param("name") String username, Pageable pageable);
	Page<Product> findAll(Pageable pageable);
	Page<Product> findByCategoryId(long id, Pageable pageeable);
}
