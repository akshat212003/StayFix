package com.stayfix.dto;

import com.stayfix.enum_.Priority;
import jakarta.validation.constraints.NotNull;

public class AssignComplaintRequest {

    @NotNull(message = "Staff ID is required")
    private Long staffId;

    private Priority priority;

    public AssignComplaintRequest() {}

    public AssignComplaintRequest(Long staffId, Priority priority) {
        this.staffId = staffId;
        this.priority = priority;
    }

    public Long getStaffId() { return staffId; }
    public void setStaffId(Long staffId) { this.staffId = staffId; }

    public Priority getPriority() { return priority; }
    public void setPriority(Priority priority) { this.priority = priority; }
}
