package com.stayfix.entity;

import com.stayfix.enum_.ImageType;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "complaint_images")
public class ComplaintImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "complaint_id", nullable = false)
    private Complaint complaint;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "image_type", nullable = false, length = 30)
    private ImageType imageType = ImageType.ISSUE;

    @CreationTimestamp
    @Column(name = "uploaded_at", updatable = false)
    private LocalDateTime uploadedAt;

    public ComplaintImage() {}

    public ComplaintImage(Long id, Complaint complaint, String imageUrl, ImageType imageType, LocalDateTime uploadedAt) {
        this.id = id;
        this.complaint = complaint;
        this.imageUrl = imageUrl;
        this.imageType = imageType != null ? imageType : ImageType.ISSUE;
        this.uploadedAt = uploadedAt;
    }

    public static ComplaintImageBuilder builder() {
        return new ComplaintImageBuilder();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Complaint getComplaint() { return complaint; }
    public void setComplaint(Complaint complaint) { this.complaint = complaint; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public ImageType getImageType() { return imageType; }
    public void setImageType(ImageType imageType) { this.imageType = imageType; }

    public LocalDateTime getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }

    public static class ComplaintImageBuilder {
        private Long id;
        private Complaint complaint;
        private String imageUrl;
        private ImageType imageType = ImageType.ISSUE;
        private LocalDateTime uploadedAt;

        public ComplaintImageBuilder id(Long id) { this.id = id; return this; }
        public ComplaintImageBuilder complaint(Complaint complaint) { this.complaint = complaint; return this; }
        public ComplaintImageBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public ComplaintImageBuilder imageType(ImageType imageType) { this.imageType = imageType; return this; }
        public ComplaintImageBuilder uploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; return this; }

        public ComplaintImage build() {
            return new ComplaintImage(id, complaint, imageUrl, imageType, uploadedAt);
        }
    }
}
