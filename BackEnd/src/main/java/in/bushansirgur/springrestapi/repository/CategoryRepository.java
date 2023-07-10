package in.bushansirgur.springrestapi.repository;


import org.springframework.data.repository.PagingAndSortingRepository;

import in.bushansirgur.springrestapi.model.Category;

public interface CategoryRepository extends PagingAndSortingRepository<Category, Long> {
	
}
