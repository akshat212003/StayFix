package com.stayfix.dto;

import com.stayfix.enum_.Category;

public class CategoryAnalyticsDto {
    private Category category;
    private Long count;

    public CategoryAnalyticsDto() {}

    public CategoryAnalyticsDto(Category category, Long count) {
        this.category = category;
        this.count = count;
    }

    public static CategoryAnalyticsDtoBuilder builder() {
        return new CategoryAnalyticsDtoBuilder();
    }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

    public Long getCount() { return count; }
    public void setCount(Long count) { this.count = count; }

    public static class CategoryAnalyticsDtoBuilder {
        private Category category;
        private Long count;

        public CategoryAnalyticsDtoBuilder category(Category category) { this.category = category; return this; }
        public CategoryAnalyticsDtoBuilder count(Long count) { this.count = count; return this; }

        public CategoryAnalyticsDto build() {
            return new CategoryAnalyticsDto(category, count);
        }
    }
}
