package com.stayfix.dto;

import com.stayfix.enum_.ImageType;
import java.time.LocalDateTime;

public class ComplaintImageDto {
    private Long id;
    private String imageUrl;
    private ImageType imageType;
    private LocalDateTime uploadedAt;

    public ComplaintImageDto() {}

    public ComplaintImageDto(Long id, String imageUrl, ImageType imageType, LocalDateTime uploadedAt) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.imageType = imageType;
        this.uploadedAt = uploadedAt;
    }

    public static ComplaintImageDtoBuilder builder() {
        return new ComplaintImageDtoBuilder();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public ImageType getImageType() { return imageType; }
    public void setImageType(ImageType imageType) { this.imageType = imageType; }

    public LocalDateTime getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }

    public static class ComplaintImageDtoBuilder {
        private Long id;
        private String imageUrl;
        private ImageType imageType;
        private LocalDateTime uploadedAt;

        public ComplaintImageDtoBuilder id(Long id) { this.id = id; return this; }
        public ComplaintImageDtoBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public ComplaintImageDtoBuilder imageType(ImageType imageType) { this.imageType = imageType; return this; }
        public ComplaintImageDtoBuilder uploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; return this; }

        public ComplaintImageDto build() {
            return new ComplaintImageDto(id, imageUrl, imageType, uploadedAt);
        }
    }
}
