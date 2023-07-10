package in.bushansirgur.springrestapi.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import in.bushansirgur.springrestapi.model.Product;
import in.bushansirgur.springrestapi.service.ProductService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ProductController {
	
	//localhost:8080/api/v1//
	
	@Autowired
	private ProductService pService;
	
	
	@GetMapping ("/products")
	 public ResponseEntity<List<Product>> getProduct(@RequestParam Integer pageNumber, @RequestParam Integer pageSize){
	     return new ResponseEntity<List<Product>>(pService.getProducts(pageNumber, pageSize),HttpStatus.OK);
	}
	
	@GetMapping("/products/{id}")
	public ResponseEntity<Product> getProduct(@PathVariable Long id) {
		return new ResponseEntity<Product>(pService.getSingleProducts(id),HttpStatus.OK);
	}
	
	@CrossOrigin(origins = "http://localhost")
	@PostMapping("/products/save")
    public ResponseEntity<Product> createProduct(@Valid @RequestBody Product product) {
        Product createdProduct = pService.saveProducts(product);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }
	
	@PutMapping("/products/update/{id}")
	public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
	    Product updatedProduct = pService.updateProducts(id, product);
	    return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
	}

	@DeleteMapping("/products")
	public ResponseEntity<HttpStatus>  deleteProduct(@RequestParam Long id) {
		return new ResponseEntity<HttpStatus>(HttpStatus.NO_CONTENT);
	}
	
	@GetMapping ("/products/filterByName")
	 public ResponseEntity<List<Product>> getProductsByName(@RequestParam String name){
	     return new ResponseEntity<List<Product>>(pService.getProductsByName(name), HttpStatus.OK);
	}
	
	@GetMapping ("/products/filterByNameAndBrand")
	public ResponseEntity<List<Product>> getProductsByNameAndBrand (@RequestParam String name, @RequestParam long brand){
	     return new ResponseEntity<List<Product>> (pService.getProductsByNameAndBrand (name, brand), HttpStatus.OK);
	}
	
	@GetMapping ("/products/filterByKeyword")
	public ResponseEntity<List<Product>> getProductsByKeyword(@RequestParam String keyword){
	     return new ResponseEntity<List<Product>> (pService.getProductsByKeyword(keyword),HttpStatus.OK);
	}
	
	@GetMapping("/products/{name}/{brand}")
	public ResponseEntity<List<Product>> getProductsByNameORBrand(@PathVariable String name, @PathVariable long brand){
	     return new ResponseEntity<List<Product>> (pService.getProductsByNameORBrand(name, brand),HttpStatus.OK);
	}
	
	@DeleteMapping("/products/delete/{id}")
	public ResponseEntity<String> deleteByProductId(@PathVariable Long id) {
	    pService.deleteByProductId(id);
	    return ResponseEntity.ok().body("Product with ID " + id + " deleted successfully");
	}

	@GetMapping("/products/category/{categoryId}")
	public ResponseEntity<Page<Product>> getProductsByCategoryId(@PathVariable Long categoryId){
	        int page =0;
	        int size=5;
	    Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
	    Page<Product> products = pService.findByCategoriesIdOrderByCreatedAtDesc(categoryId, pageable);
	    return ResponseEntity.ok(products);
	}

	
}
