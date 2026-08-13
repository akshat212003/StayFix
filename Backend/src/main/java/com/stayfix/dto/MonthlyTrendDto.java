package com.stayfix.dto;

public class MonthlyTrendDto {
    private String month;
    private Long total;
    private Long resolved;

    public MonthlyTrendDto() {}

    public MonthlyTrendDto(String month, Long total, Long resolved) {
        this.month = month;
        this.total = total;
        this.resolved = resolved;
    }

    public static MonthlyTrendDtoBuilder builder() {
        return new MonthlyTrendDtoBuilder();
    }

    public String getMonth() { return month; }
    public void setMonth(String month) { this.month = month; }

    public Long getTotal() { return total; }
    public void setTotal(Long total) { this.total = total; }

    public Long getResolved() { return resolved; }
    public void setResolved(Long resolved) { this.resolved = resolved; }

    public static class MonthlyTrendDtoBuilder {
        private String month;
        private Long total;
        private Long resolved;

        public MonthlyTrendDtoBuilder month(String month) { this.month = month; return this; }
        public MonthlyTrendDtoBuilder total(Long total) { this.total = total; return this; }
        public MonthlyTrendDtoBuilder resolved(Long resolved) { this.resolved = resolved; return this; }

        public MonthlyTrendDto build() {
            return new MonthlyTrendDto(month, total, resolved);
        }
    }
}
