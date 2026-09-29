package com.killbridge.dto;

import com.killbridge.entity.ConnectionStatus;

public class ConnectionResponseDTO {

    private Long id;

    private ConnectionStatus status;

    private Long requesterId;
    private String requesterName;
    private String requesterEmail;

    private Long receiverId;
    private String receiverName;
    private String receiverEmail;


    public ConnectionResponseDTO() {
    }


    public ConnectionResponseDTO(
            Long id,
            ConnectionStatus status,
            Long requesterId,
            String requesterName,
            String requesterEmail,
            Long receiverId,
            String receiverName,
            String receiverEmail) {

        this.id = id;
        this.status = status;

        this.requesterId = requesterId;
        this.requesterName = requesterName;
        this.requesterEmail = requesterEmail;

        this.receiverId = receiverId;
        this.receiverName = receiverName;
        this.receiverEmail = receiverEmail;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public ConnectionStatus getStatus() {
        return status;
    }

    public void setStatus(ConnectionStatus status) {
        this.status = status;
    }


    public Long getRequesterId() {
        return requesterId;
    }

    public void setRequesterId(Long requesterId) {
        this.requesterId = requesterId;
    }


    public String getRequesterName() {
        return requesterName;
    }

    public void setRequesterName(String requesterName) {
        this.requesterName = requesterName;
    }


    public String getRequesterEmail() {
        return requesterEmail;
    }

    public void setRequesterEmail(String requesterEmail) {
        this.requesterEmail = requesterEmail;
    }


    public Long getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(Long receiverId) {
        this.receiverId = receiverId;
    }


    public String getReceiverName() {
        return receiverName;
    }

    public void setReceiverName(String receiverName) {
        this.receiverName = receiverName;
    }


    public String getReceiverEmail() {
        return receiverEmail;
    }

    public void setReceiverEmail(String receiverEmail) {
        this.receiverEmail = receiverEmail;
    }
}