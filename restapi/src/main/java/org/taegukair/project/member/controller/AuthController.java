package org.taegukair.project.member.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.taegukair.project.flight.dto.ResponseDTO;
import org.taegukair.project.member.controller.LoginRequest;
import org.taegukair.project.member.dto.MemberDTO;
import org.taegukair.project.member.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @Operation(summary = "로그인요청", description = "로그인 및 인증이 진행됩니다.", tags = {"AuthController"})
    @PostMapping("/login")
    public ResponseEntity<ResponseDTO> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity
                .ok()
                .body(new ResponseDTO("로그인 성공", authService.login(loginRequest)));
    }

    @Operation(summary = "회원 가입 요청", description = "회원 가입이 진행됩니다.", tags = {"AuthController"})
    @PostMapping("/signup")
    public ResponseEntity<ResponseDTO> signup(@RequestBody MemberDTO memberDTO) {
        System.out.println("Received DTO for signup: " + memberDTO); // 로그 추가
        return ResponseEntity
                .ok()
                .body(new ResponseDTO("회원가입 성공", authService.signup(memberDTO)));
    }
}
