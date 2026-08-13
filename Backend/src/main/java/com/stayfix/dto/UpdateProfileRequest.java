package com.stayfix.dto;

public class UpdateProfileRequest {
    private String fullName;
    private String phoneNumber;
    private String roomNumber;
    private String hostelBlock;

    public UpdateProfileRequest() {}

    public UpdateProfileRequest(String fullName, String phoneNumber, String roomNumber, String hostelBlock) {
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.roomNumber = roomNumber;
        this.hostelBlock = hostelBlock;
    }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }

    public String getHostelBlock() { return hostelBlock; }
    public void setHostelBlock(String hostelBlock) { this.hostelBlock = hostelBlock; }
}
