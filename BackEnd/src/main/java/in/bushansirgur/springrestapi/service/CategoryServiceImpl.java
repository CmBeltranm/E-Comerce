package in.bushansirgur.springrestapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import in.bushansirgur.springrestapi.model.Category;
import in.bushansirgur.springrestapi.repository.CategoryRepository;

@Service
public class CategoryServiceImpl  implements CategoryService {
	
	@Autowired
	private CategoryRepository cRepository;

	@Override
	public Category saveCategory(Category category) {
		return cRepository.save(category);
		
	}

	@Override
	public List<Category> getProducts(int pageNumber, int pageSize) {
		Pageable pages = PageRequest.of(pageNumber, pageSize, Direction.ASC, "id");
		return cRepository.findAll(pages).getContent();
	}
	
	
}
