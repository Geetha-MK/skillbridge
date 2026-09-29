package com.killbridge.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.killbridge.dto.LearningRequestResponseDTO;
import com.killbridge.entity.LearningRequest;
import com.killbridge.entity.LearningRequestStatus;
import com.killbridge.service.LearningRequestService;

@RestController
public class LearningRequestController {

    private final LearningRequestService learningRequestService;


    public LearningRequestController(
            LearningRequestService learningRequestService) {

        this.learningRequestService =
                learningRequestService;
    }


    // =====================================================
    // CREATE LEARNING REQUEST
    // =====================================================

    @PostMapping("/learning-requests")
    public LearningRequest createLearningRequest(
            @RequestBody LearningRequest learningRequest) {

        return learningRequestService
                .saveLearningRequest(learningRequest);
    }


    // =====================================================
    // GET ALL LEARNING REQUESTS
    // =====================================================

    @GetMapping("/learning-requests")
    public List<LearningRequestResponseDTO>
            getAllLearningRequests() {

        return learningRequestService
                .getAllLearningRequests();
    }


    // =====================================================
    // UPDATE REQUEST STATUS
    // =====================================================

    @PutMapping("/learning-requests/{id}/status")
    public LearningRequestResponseDTO
            updateLearningRequestStatus(

                    @PathVariable Long id,

                    @RequestParam
                    LearningRequestStatus status,

                    Authentication authentication) {

        return learningRequestService
                .updateLearningRequestStatus(
                        id,
                        status,
                        authentication
                );
    }
}