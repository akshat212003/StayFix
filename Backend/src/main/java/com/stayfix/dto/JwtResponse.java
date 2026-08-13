package com.stayfix.dto;

public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String fullName;
    private String email;
    private String role;

    public JwtResponse() {}

    public JwtResponse(String token, String type, Long id, String fullName, String email, String role) {
        this.token = token;
        this.type = type != null ? type : "Bearer";
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.role = role;
    }

    public static JwtResponseBuilder builder() {
        return new JwtResponseBuilder();
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public static class JwtResponseBuilder {
        private String token;
        private String type = "Bearer";
        private Long id;
        private String fullName;
        private String email;
        private String role;

        public JwtResponseBuilder token(String token) { this.token = token; return this; }
        public JwtResponseBuilder type(String type) { this.type = type; return this; }
        public JwtResponseBuilder id(Long id) { this.id = id; return this; }
        public JwtResponseBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public JwtResponseBuilder email(String email) { this.email = email; return this; }
        public JwtResponseBuilder role(String role) { this.role = role; return this; }

        public JwtResponse build() {
            return new JwtResponse(token, type, id, fullName, email, role);
        }
    }
}
