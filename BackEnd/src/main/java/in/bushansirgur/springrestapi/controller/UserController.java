package in.bushansirgur.springrestapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import in.bushansirgur.springrestapi.model.User;
import in.bushansirgur.springrestapi.service.UserService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<User> signUp(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam("email") String email, @RequestParam("password") String password) {
        boolean isValid = userService.login(email, password);
        if (isValid) {
            return ResponseEntity.ok("Inicio de sesión válido");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Inicio de sesión inválido");
        }
    }

    @PutMapping("/{id}/changepassword")
    public ResponseEntity<User> changePassword(@PathVariable Long id, @RequestBody User user) {
    	User updatedPassword = userService.changePassword(id, user);
	    return new ResponseEntity<>(updatedPassword, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUserInfo(@PathVariable("id") Long id, @RequestBody User user) {
        User updatedUser = userService.updateUser(id, user);
        if (updatedUser != null) {
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
}
