package in.bushansirgur.springrestapi.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import in.bushansirgur.springrestapi.model.Comment;
import in.bushansirgur.springrestapi.repository.CommentRepository;

@Service
public class CommentServiceImpl implements CommentService {
	
	@Autowired
	private CommentRepository cRepository;
	
	@Override
	public List<Comment> getComment(int pageNumber, int pageSize) {
		Pageable pages = PageRequest.of(pageNumber, pageSize, Direction.DESC, "id");
		return cRepository.findAll(pages).getContent();
	}

	@Override
	public Comment saveComment(Comment comment) {
		return cRepository.save(comment);
	}
	
}
