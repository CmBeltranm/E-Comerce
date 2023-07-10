package in.bushansirgur.springrestapi.service;

import in.bushansirgur.springrestapi.model.Comment;
import java.util.List;

public interface CommentService {
	
	List<Comment> getComment(int pageNumber, int pageSize);
	
	Comment saveComment(Comment comment);
		
	
}