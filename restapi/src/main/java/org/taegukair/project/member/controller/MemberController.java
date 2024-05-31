package org.taegukair.project.member.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.taegukair.project.flight.dto.ResponseDTO;
import org.taegukair.project.member.dto.MemberDTO;
import org.taegukair.project.member.service.MemberService;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class MemberController {
	
	private final MemberService memberService;
	
	public MemberController(MemberService memberService) {
		this.memberService = memberService;
	}
	
	@Operation(summary = "회원 조회 요청", description = "회원 한명이 조회됩니다.", tags = { "MemberController" })
	@GetMapping("/members/{memberId}")
	public ResponseEntity<ResponseDTO> selectMyMemberInfo(@PathVariable String memberId) {
		return ResponseEntity.ok().body(new ResponseDTO("조회 성공", memberService.selectMyInfo(memberId)));
	}
	@Operation(summary = "전체 회원 조회 요청", description = "모든 회원이 조회됩니다.", tags = { "MemberController" })
	@GetMapping("/members")
	public ResponseEntity<ResponseDTO> selectAllMembers() {
		List<MemberDTO> members = memberService.selectAllMembers();
		return ResponseEntity.ok().body(new ResponseDTO("전체 조회 성공", members));
	}

	@Operation(summary = "회원탈퇴요청", description = "회원탈퇴가 진행됩니다.", tags = {"MemberController"})
	@DeleteMapping("/members/{memberId}")
	public ResponseEntity<ResponseDTO> deleteMember(@PathVariable String memberId) {
		try {
			memberService.deleteMember(memberId);
			return new ResponseEntity<>(new ResponseDTO("회원탈퇴 성공", true), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new ResponseDTO("회원탈퇴 실패: " + e.getMessage(), false), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Operation(summary = "회원정보수정요청", description = "회원정보 수정이 진행됩니다.", tags = {"MemberController"})
	@PutMapping("/members")
	public ResponseEntity<ResponseDTO> updateMember(@RequestBody MemberDTO memberDTO) {
		try {
			MemberDTO updatedMember = memberService.updateMember(memberDTO);
			if (updatedMember != null) {
				return new ResponseEntity<>(new ResponseDTO("회원정보 수정 성공", true), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(new ResponseDTO("회원정보 수정 실패: 회원을 찾을 수 없습니다.", false), HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(new ResponseDTO("회원정보 수정 실패: " + e.getMessage(), false), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
