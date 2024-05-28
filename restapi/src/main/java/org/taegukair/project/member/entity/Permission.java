package org.taegukair.project.member.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "permission")
public class Permission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int permissionCode;

    @Column(nullable = false)
    private String permissionName;

    @Column(nullable = false)
    private String permissionDesc;

    public Permission() {
    }

    public Permission(int permissionCode, String permissionName, String permissionDesc) {
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
        return "Permission{" +
                "permissionCode=" + permissionCode +
                ", permissionName='" + permissionName + '\'' +
                ", permissionDesc='" + permissionDesc + '\'' +
                '}';
    }
}
