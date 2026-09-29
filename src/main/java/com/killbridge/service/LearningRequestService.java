package com.killbridge.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.killbridge.dto.LearningRequestResponseDTO;
import com.killbridge.entity.LearningRequest;
import com.killbridge.entity.LearningRequestStatus;
import com.killbridge.entity.User;
import com.killbridge.repository.LearningRequestRepository;

@Service
public class LearningRequestService {

    private final LearningRequestRepository learningRequestRepository;

    public LearningRequestService(
            LearningRequestRepository learningRequestRepository) {

        this.learningRequestRepository = learningRequestRepository;
    }


    // =====================================================
    // CREATE LEARNING REQUEST
    // =====================================================

    public LearningRequest saveLearningRequest(
            LearningRequest learningRequest) {

        if (learningRequest.getUser() == null ||
                learningRequest.getTeacher() == null) {

            throw new IllegalStateException(
                    "Learner and teacher are required"
            );
        }


        // Prevent user from sending request to themselves

        if (learningRequest.getUser().getId()
                .equals(learningRequest.getTeacher().getId())) {

            throw new IllegalStateException(
                    "You cannot send a learning request to yourself"
            );
        }


        return learningRequestRepository.save(
                learningRequest
        );
    }


    // =====================================================
    // GET ALL LEARNING REQUESTS
    // =====================================================

    public List<LearningRequestResponseDTO>
            getAllLearningRequests() {

        return learningRequestRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }


    // =====================================================
    // UPDATE REQUEST STATUS
    // =====================================================

    public LearningRequestResponseDTO
            updateLearningRequestStatus(
                    Long id,
                    LearningRequestStatus status,
                    Authentication authentication) {

        LearningRequest learningRequest =
                learningRequestRepository
                        .findById(id)
                        .orElse(null);


        if (learningRequest == null) {
            return null;
        }


        // Get the teacher who received the request

        User teacher =
                learningRequest.getTeacher();


        // Make sure the logged-in user is the teacher

        if (teacher == null ||
                !teacher.getEmail()
                        .equals(authentication.getName())) {

            throw new IllegalStateException(
                    "Only the teacher who received this request can update it"
            );
        }


        // Only PENDING requests can be changed

        if (learningRequest.getStatus()
                != LearningRequestStatus.PENDING) {

            throw new IllegalStateException(
                    "Learning request status cannot be changed once it is "
                    + learningRequest.getStatus()
            );
        }


        learningRequest.setStatus(status);


        LearningRequest updatedRequest =
                learningRequestRepository.save(
                        learningRequest
                );


        return convertToDTO(updatedRequest);
    }


    // =====================================================
    // CONVERT ENTITY → DTO
    // =====================================================

    private LearningRequestResponseDTO convertToDTO(
            LearningRequest request) {

        User user = request.getUser();
        User teacher = request.getTeacher();


        return new LearningRequestResponseDTO(

                request.getId(),

                request.getStatus(),


                // Learner
                user != null ? user.getId() : null,
                user != null ? user.getName() : null,
                user != null ? user.getEmail() : null,


                // Teacher
                teacher != null ? teacher.getId() : null,
                teacher != null ? teacher.getName() : null,
                teacher != null ? teacher.getEmail() : null,


                // Skill
                request.getSkill() != null
                        ? request.getSkill().getId()
                        : null,

                request.getSkill() != null
                        ? request.getSkill().getName()
                        : null
        );
    }
}