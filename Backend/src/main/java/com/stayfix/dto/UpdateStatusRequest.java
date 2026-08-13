package com.stayfix.dto;

import com.stayfix.enum_.Status;
import jakarta.validation.constraints.NotNull;

public class UpdateStatusRequest {

    @NotNull(message = "Status is required")
    private Status status;

    private String remarks;

    public UpdateStatusRequest() {}

    public UpdateStatusRequest(Status status, String remarks) {
        this.status = status;
        this.remarks = remarks;
    }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
}
