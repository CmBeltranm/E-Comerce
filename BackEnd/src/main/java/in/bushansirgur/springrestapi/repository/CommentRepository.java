package in.bushansirgur.springrestapi.repository;


import org.springframework.data.repository.PagingAndSortingRepository;
import in.bushansirgur.springrestapi.model.Comment;


public interface CommentRepository extends PagingAndSortingRepository<Comment , Long> {
	
		
}