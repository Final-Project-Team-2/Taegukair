package org.taegukair.project.member.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", memberService.selectMyInfo(memberId)));
	}
	@Operation(summary = "전체 회원 조회 요청", description = "모든 회원이 조회됩니다.", tags = { "MemberController" })
	@GetMapping("/members")
	public ResponseEntity<ResponseDTO> selectAllMembers() {
		List<MemberDTO> members = memberService.selectAllMembers();
		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "전체 조회 성공", members));
	}
}