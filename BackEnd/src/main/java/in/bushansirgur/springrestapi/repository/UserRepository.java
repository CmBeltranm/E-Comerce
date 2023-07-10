package in.bushansirgur.springrestapi.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import in.bushansirgur.springrestapi.model.User;

public interface UserRepository extends PagingAndSortingRepository<User, Long> {
	User findByEmail(String email);
}
