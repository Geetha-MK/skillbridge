package com.killbridge.service;

import java.util.ArrayList;
import java.util.List;
import com.killbridge.dto.UserRequestDTO;
import com.killbridge.dto.UserResponseDTO;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.killbridge.entity.User;
import com.killbridge.exception.UserNotFoundException;
import com.killbridge.repository.UserRepository;

@Service
public class UserService {
	private final UserRepository userRepository;
	
	private final PasswordEncoder passwordEncoder;
	
	
	public UserService(
	        UserRepository userRepository,
	        PasswordEncoder passwordEncoder) {

	    this.userRepository = userRepository;
	    this.passwordEncoder = passwordEncoder;
	}
	
    public UserResponseDTO saveUser(UserRequestDTO userRequestDTO) {

        User user = new User();

        user.setName(userRequestDTO.getName());
        user.setEmail(userRequestDTO.getEmail());
        user.setRole("USER");
        
        user.setPassword(
                passwordEncoder.encode(userRequestDTO.getPassword())
        );

        User savedUser = userRepository.save(user);

        UserResponseDTO response = new UserResponseDTO();

        response.setId(savedUser.getId());
        response.setName(savedUser.getName());
        response.setEmail(savedUser.getEmail());

        return response;
    }
    public List<UserResponseDTO> getAllUsers() {

        List<User> users = userRepository.findAll();

        List<UserResponseDTO> responses = new ArrayList<>();

        for (User user : users) {

            UserResponseDTO response = new UserResponseDTO();

            response.setId(user.getId());
            response.setName(user.getName());
            response.setEmail(user.getEmail());

            responses.add(response);
        }

        return responses;
    }
    public User updateUser(Long id, User user) {

        User existingUser = userRepository.findById(id).orElse(null);

        if (existingUser != null) {
            existingUser.setName(user.getName());
            existingUser.setEmail(user.getEmail());
            existingUser.setPassword(user.getPassword());

            return userRepository.save(existingUser);
        }

        throw new UserNotFoundException("User not found with id: " + id);
    }
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
