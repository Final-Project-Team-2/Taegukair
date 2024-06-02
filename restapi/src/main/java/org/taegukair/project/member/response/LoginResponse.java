package org.taegukair.project.member.response;

import org.taegukair.project.member.dto.TokenDTO;

public class LoginResponse {
    private TokenDTO token;
    private String memberId;
    private int memberCode; // memberCode 추가

    public LoginResponse(TokenDTO token, String memberId, int memberCode) {
        this.token = token;
        this.memberId = memberId;
        this.memberCode = memberCode; // 초기화
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

    public int getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(int memberCode) {
        this.memberCode = memberCode;
    }
}
