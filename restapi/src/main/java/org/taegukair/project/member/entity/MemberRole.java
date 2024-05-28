package org.taegukair.project.member.entity;

import jakarta.persistence.*;
import org.taegukair.project.member.entity.Authority;

@Entity
@Table(name = "member_role")
public class MemberRole {
	@Id
	@Column(name = "member_code")
	private int memberNo;

	@Id
	@Column(name = "authority_code")
	private int authorityCode;

	@ManyToOne
	@JoinColumn(name = "authority_code", insertable = false, updatable = false)
	private Authority authority;

	// Default constructor
	public MemberRole() {}

	public MemberRole(int memberNo, int authorityCode) {
		this.memberNo = memberNo;
		this.authorityCode = authorityCode;
	}

	public MemberRole(int memberNo, int authorityCode, Authority authority) {
		this.memberNo = memberNo;
		this.authorityCode = authorityCode;
		this.authority = authority;
	}

	public int getMemberNo() {
		return memberNo;
	}

	public void setMemberNo(int memberNo) {
		this.memberNo = memberNo;
	}

	public int getAuthorityCode() {
		return authorityCode;
	}

	public void setAuthorityCode(int authorityCode) {
		this.authorityCode = authorityCode;
	}

	public Authority getAuthority() {
		return authority;
	}

	public void setAuthority(Authority authority) {
		this.authority = authority;
	}

	@Override
	public String toString() {
		return "MemberRole{" +
				"memberNo=" + memberNo +
				", authorityCode=" + authorityCode +
				", authority=" + authority +
				'}';
	}
}
