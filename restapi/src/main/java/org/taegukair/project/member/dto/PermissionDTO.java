package org.taegukair.project.member.dto;

public class PermissionDTO {
    private int permissionCode;
    private String permissionName;
    private String permissionDesc;

    public PermissionDTO() {
    }

    public PermissionDTO(int permissionCode, String permissionName, String permissionDesc) {
        this.permissionCode = permissionCode;
        this.permissionName = permissionName;
        this.permissionDesc = permissionDesc;
    }

    public int getPermissionCode() {
        return permissionCode;
    }

    public void setPermissionCode(int permissionCode) {
        this.permissionCode = permissionCode;
    }

    public String getPermissionName() {
        return permissionName;
    }

    public void setPermissionName(String permissionName) {
        this.permissionName = permissionName;
    }

    public String getPermissionDesc() {
        return permissionDesc;
    }

    public void setPermissionDesc(String permissionDesc) {
        this.permissionDesc = permissionDesc;
    }

    @Override
    public String toString() {
        return "PermissionDTO{" +
                "permissionCode=" + permissionCode +
                ", permissionName='" + permissionName + '\'' +
                ", permissionDesc='" + permissionDesc + '\'' +
                '}';
    }
}
