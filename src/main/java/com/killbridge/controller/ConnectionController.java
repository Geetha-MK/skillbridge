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

import com.killbridge.dto.ConnectionResponseDTO;
import com.killbridge.entity.Connection;
import com.killbridge.entity.ConnectionStatus;
import com.killbridge.service.ConnectionService;

@RestController
public class ConnectionController {

    private final ConnectionService connectionService;


    public ConnectionController(
            ConnectionService connectionService) {

        this.connectionService =
                connectionService;
    }


    // =====================================================
    // CREATE CONNECTION
    // =====================================================

    @PostMapping("/connections")
    public ConnectionResponseDTO createConnection(
            @RequestBody Connection connection) {

        return connectionService.saveConnection(
                connection
        );
    }


    // =====================================================
    // GET ALL CONNECTIONS
    // =====================================================

    @GetMapping("/connections")
    public List<ConnectionResponseDTO>
            getAllConnections() {

        return connectionService
                .getAllConnections();
    }


    // =====================================================
    // UPDATE CONNECTION STATUS
    // =====================================================

    @PutMapping("/connections/{id}/status")
    public ConnectionResponseDTO updateConnectionStatus(
            @PathVariable Long id,
            @RequestParam ConnectionStatus status,
            Authentication authentication) {

        return connectionService
                .updateConnectionStatus(
                        id,
                        status,
                        authentication
                );
    }
}