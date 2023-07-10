package in.bushansirgur.springrestapi.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import in.bushansirgur.springrestapi.model.Product;


public interface ProductRepository extends PagingAndSortingRepository< Product , Long> {
	
	List<Product> findByName (String name);
	
	//SELECT * FROM table WHERE name="bushan." AND location="INdia"
	List<Product> findByNameAndBrand(String name, long brand);
	
	//SELECT * FROM tbl_product p WHERE p.name LIKE '%C%'
	@Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE %:keyword%")
	List<Product> searchProduct(@Param("keyword") String keyword,Sort sort);

	
	@Query("FROM Product WHERE name = :name OR brand = :brand")
	List<Product> getProductByNameAndBrand(String name, long brand);
	
	@Transactional
	@Modifying
	@Query("DELETE FROM Product WHERE id = :id")
	Integer deleteProductById(@Param("id") Long id);
	
	Page<Product> findByCategoriesIdOrderByCreatedAtDesc(@Param("categoryId") Long categoryId, Pageable pageable);	
}











