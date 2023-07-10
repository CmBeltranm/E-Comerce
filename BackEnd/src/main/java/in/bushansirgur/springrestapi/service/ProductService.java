package in.bushansirgur.springrestapi.service;

import in.bushansirgur.springrestapi.model.Product;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {
	
	List<Product> getProducts(int pageNumber, int pageSize);
	
	Product saveProducts(Product product);
	
	Product getSingleProducts (Long id);
	
	void deleteProducts (Long id);
	
	Product updateProducts (Long id,Product product);
	
	List<Product> getProductsByName (String name);

	List<Product> getProductsByNameAndBrand(String name, long brand);
	
	List<Product> getProductsByKeyword(String keyword);
	
	List<Product> getProductsByNameORBrand(String name, long brand);
	
	Integer deleteByProductId(Long id);
	
	Optional<Product> getProductById(Long id);
	
	Page<Product> findByCategoriesIdOrderByCreatedAtDesc(Long categoryId, Pageable pageable);
}	
