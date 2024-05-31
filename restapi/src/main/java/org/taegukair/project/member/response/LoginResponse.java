package org.taegukair.project.member.response;

import org.taegukair.project.member.dto.TokenDTO;

public class LoginResponse {
    private TokenDTO token;
    private String memberId;

    public LoginResponse(TokenDTO token, String memberId) {
        this.token = token;
        this.memberId = memberId;
    }

    public TokenDTO getToken() {
        return token;
    }

    public void setToken(TokenDTO token) {
        this.token = token;
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }
}
