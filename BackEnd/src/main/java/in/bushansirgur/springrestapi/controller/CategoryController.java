package in.bushansirgur.springrestapi.controller;

import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import in.bushansirgur.springrestapi.model.Category;
import in.bushansirgur.springrestapi.service.CategoryService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CategoryController {
	
	//localhost:8080/api/v1//
	

	@Autowired
	private CategoryService caService;
	
	
	@GetMapping ("/categories")
	 public ResponseEntity<List<Category>> getProduct(@RequestParam Integer pageNumber, @RequestParam Integer pageSize){
	     return new ResponseEntity<List<Category>>(caService.getProducts(pageNumber, pageSize),HttpStatus.OK);
	}
	
	
	@PostMapping("/categories")
	public ResponseEntity<Category> saveCategory(@Valid @RequestBody Category category) {
		return new ResponseEntity<Category>(caService.saveCategory(category),HttpStatus.CREATED);
	}
	
	
}
