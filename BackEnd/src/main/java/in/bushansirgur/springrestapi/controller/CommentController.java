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
import in.bushansirgur.springrestapi.model.Comment;
import in.bushansirgur.springrestapi.service.CommentService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CommentController {
	
	//localhost:8080/api/v1//
	
	@Autowired
	private CommentService cService;
	
	
	@GetMapping ("/comments")
	 public ResponseEntity<List<Comment>> getCommet(@RequestParam Integer pageNumber, @RequestParam Integer pageSize){
	     return new ResponseEntity<List<Comment>>(cService.getComment(pageNumber, pageSize),HttpStatus.OK);
	}
	
	@PostMapping("/comments")
	public ResponseEntity<Comment> saveCommet(@Valid @RequestBody Comment comment) {
		return new ResponseEntity<Comment>(cService.saveComment(comment),HttpStatus.CREATED);
	}
}