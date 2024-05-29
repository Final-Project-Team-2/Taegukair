package org.taegukair.project.member.dto;

public class AuthorityDTO {
    private int authorityCode;
    private String authorityName;
    private String authorityDesc;

    public AuthorityDTO() {
    }

    public AuthorityDTO(int authorityCode, String authorityName, String authorityDesc) {
        this.authorityCode = authorityCode;
        this.authorityName = authorityName;
        this.authorityDesc = authorityDesc;
    }

    public int getAuthorityCode() {
        return authorityCode;
    }

    public void setAuthorityCode(int authorityCode) {
        this.authorityCode = authorityCode;
    }

    public String getAuthorityName() {
        return authorityName;
    }

    public void setAuthorityName(String authorityName) {
        this.authorityName = authorityName;
    }

    public String getAuthorityDesc() {
        return authorityDesc;
    }

    public void setAuthorityDesc(String authorityDesc) {
        this.authorityDesc = authorityDesc;
    }

    @Override
    public String toString() {
        return "AuthorityDTO{" +
                "authorityCode=" + authorityCode +
                ", authorityName='" + authorityName + '\'' +
                ", authorityDesc='" + authorityDesc + '\'' +
                '}';
    }
}

