package com.stayfix.service;

import com.stayfix.entity.Complaint;
import com.stayfix.entity.Notification;
import com.stayfix.entity.User;
import com.stayfix.repository.NotificationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class NotificationMailService {

    private static final Logger logger = LoggerFactory.getLogger(NotificationMailService.class);

    private final JavaMailSender mailSender;
    private final NotificationRepository notificationRepository;

    public NotificationMailService(JavaMailSender mailSender, NotificationRepository notificationRepository) {
        this.mailSender = mailSender;
        this.notificationRepository = notificationRepository;
    }

    @Async
    public void sendComplaintCreatedNotification(Complaint complaint) {
        String title = "Complaint Created: #" + complaint.getId() + " - " + complaint.getTitle();
        String message = String.format("Hello %s,\n\nYour complaint regarding '%s' (%s) has been raised successfully. Priority: %s.\n\nWe will update you as soon as staff is assigned.\n\nStayFix Team",
                complaint.getStudent().getFullName(), complaint.getTitle(), complaint.getCategory(), complaint.getPriority());

        saveAndSendNotification(complaint.getStudent(), title, message);
    }

    @Async
    public void sendComplaintAssignedNotification(Complaint complaint) {
        String studentTitle = "Staff Assigned: Complaint #" + complaint.getId();
        String studentMessage = String.format("Hello %s,\n\nYour complaint '#%s - %s' has been assigned to %s.\n\nStayFix Team",
                complaint.getStudent().getFullName(), complaint.getId(), complaint.getTitle(), complaint.getAssignedStaff().getFullName());
        saveAndSendNotification(complaint.getStudent(), studentTitle, studentMessage);

        String staffTitle = "New Task Assigned: Complaint #" + complaint.getId();
        String staffMessage = String.format("Hello %s,\n\nYou have been assigned a new complaint:\nTitle: %s\nCategory: %s\nPriority: %s\nStudent Room: %s (%s)\n\nPlease take action promptly.\n\nStayFix Team",
                complaint.getAssignedStaff().getFullName(), complaint.getTitle(), complaint.getCategory(), complaint.getPriority(),
                complaint.getStudent().getRoomNumber(), complaint.getStudent().getHostelBlock());
        saveAndSendNotification(complaint.getAssignedStaff(), staffTitle, staffMessage);
    }

    @Async
    public void sendStatusUpdateNotification(Complaint complaint, String previousStatus) {
        String title = "Status Updated: Complaint #" + complaint.getId();
        String message = String.format("Hello %s,\n\nThe status of your complaint '#%s - %s' has changed from %s to %s.\nStaff Remarks: %s\n\nStayFix Team",
                complaint.getStudent().getFullName(), complaint.getId(), complaint.getTitle(),
                previousStatus, complaint.getStatus(), complaint.getStaffRemarks() != null ? complaint.getStaffRemarks() : "N/A");

        saveAndSendNotification(complaint.getStudent(), title, message);
    }

    private void saveAndSendNotification(User recipient, String title, String message) {
        try {
            Notification notification = Notification.builder()
                    .recipient(recipient)
                    .title(title)
                    .message(message)
                    .isRead(false)
                    .build();
            notificationRepository.save(notification);

            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(recipient.getEmail());
            mailMessage.setSubject("StayFix Alert: " + title);
            mailMessage.setText(message);
            
            mailSender.send(mailMessage);
            logger.info("Email notification sent successfully to {}", recipient.getEmail());
        } catch (Exception e) {
            logger.warn("Could not send email to {}: {}. Notification saved in database.", recipient.getEmail(), e.getMessage());
        }
    }
}
