package in.bushansirgur.springrestapi.service;

import in.bushansirgur.springrestapi.model.User;

import java.util.List;

public interface UserService {
    User createUser(User user);

    Boolean login(String email, String password);

    User changePassword(Long id, User user);

    User updateUser(Long id, User user);

    List<User> getAllUsers();
}
