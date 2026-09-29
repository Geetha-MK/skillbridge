package com.killbridge.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.killbridge.dto.ConnectionResponseDTO;
import com.killbridge.entity.Connection;
import com.killbridge.entity.ConnectionStatus;
import com.killbridge.entity.User;
import com.killbridge.exception.SelfConnectionException;
import com.killbridge.repository.ConnectionRepository;

@Service
public class ConnectionService {

    private final ConnectionRepository connectionRepository;


    public ConnectionService(
            ConnectionRepository connectionRepository) {

        this.connectionRepository =
                connectionRepository;
    }


    // =====================================================
    // CREATE CONNECTION
    // =====================================================

    public ConnectionResponseDTO saveConnection(
            Connection connection) {

        if (connection.getRequester() == null ||
                connection.getReceiver() == null) {

            throw new IllegalStateException(
                    "Requester and receiver are required"
            );
        }


        // Prevent self connection

        if (connection.getRequester().getId()
                .equals(connection.getReceiver().getId())) {

            throw new SelfConnectionException(
                    "User cannot send a connection request to themselves"
            );
        }


        Connection savedConnection =
                connectionRepository.save(connection);


        return convertToDTO(savedConnection);
    }


    // =====================================================
    // GET ALL CONNECTIONS
    // =====================================================

    public List<ConnectionResponseDTO>
            getAllConnections() {

        return connectionRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }


    // =====================================================
    // UPDATE CONNECTION STATUS
    // =====================================================

    public ConnectionResponseDTO updateConnectionStatus(
            Long id,
            ConnectionStatus status,
            Authentication authentication) {

        Connection connection =
                connectionRepository
                        .findById(id)
                        .orElse(null);


        if (connection == null) {
            return null;
        }


        // =================================================
        // ONLY THE RECEIVER CAN ACCEPT/REJECT
        // =================================================

        User receiver =
                connection.getReceiver();


        if (receiver == null ||
                !receiver.getEmail()
                        .equals(authentication.getName())) {

            throw new IllegalStateException(
                    "Only the receiver can update this connection"
            );
        }


        // =================================================
        // ONLY PENDING REQUESTS CAN CHANGE
        // =================================================

        if (connection.getStatus()
                != ConnectionStatus.PENDING) {

            throw new IllegalStateException(
                    "Connection status cannot be changed once it is "
                    + connection.getStatus()
            );
        }


        connection.setStatus(status);


        Connection updatedConnection =
                connectionRepository.save(connection);


        return convertToDTO(updatedConnection);
    }


    // =====================================================
    // ENTITY → DTO
    // =====================================================

    private ConnectionResponseDTO convertToDTO(
            Connection connection) {

        User requester =
                connection.getRequester();

        User receiver =
                connection.getReceiver();


        return new ConnectionResponseDTO(

                connection.getId(),

                connection.getStatus(),


                // Requester
                requester != null
                        ? requester.getId()
                        : null,

                requester != null
                        ? requester.getName()
                        : null,

                requester != null
                        ? requester.getEmail()
                        : null,


                // Receiver
                receiver != null
                        ? receiver.getId()
                        : null,

                receiver != null
                        ? receiver.getName()
                        : null,

                receiver != null
                        ? receiver.getEmail()
                        : null
        );
    }
}