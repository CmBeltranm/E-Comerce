package in.bushansirgur.springrestapi.service;

import java.util.List;

import in.bushansirgur.springrestapi.model.Category;

public interface CategoryService {
List<Category> getProducts(int pageNumber, int pageSize);
	
	Category saveCategory(Category category);

}
