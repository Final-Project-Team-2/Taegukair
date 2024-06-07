package org.taegukair.project.member.service;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.taegukair.project.exception.DuplicatedMemberEmailException;
import org.taegukair.project.exception.LoginFailedException;
import org.taegukair.project.jwt.TokenProvider;
import org.taegukair.project.member.controller.LoginRequest;
import org.taegukair.project.member.dto.MemberDTO;
import org.taegukair.project.member.dto.TokenDTO;
import org.taegukair.project.member.entity.Member;
import org.taegukair.project.member.entity.MemberRole;
import org.taegukair.project.member.repository.MemberRepository;
import org.taegukair.project.member.repository.MemberRoleRepository;
import org.taegukair.project.member.response.LoginResponse;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final ModelMapper modelMapper;
    private final MemberRoleRepository memberRoleRepository;

    @Autowired
    public AuthService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, TokenProvider tokenProvider, ModelMapper modelMapper, MemberRoleRepository memberRoleRepository) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.modelMapper = modelMapper;
        this.memberRoleRepository = memberRoleRepository;
    }

    public Object login(LoginRequest loginRequest) {
        log.info("[AuthService] login() START");

        Member member = null;
        try {
            int memberCode = Integer.parseInt(loginRequest.getIdentifier());
            member = memberRepository.findByMemberCode(memberCode);
        } catch (NumberFormatException e) {
            member = memberRepository.findByMemberId(loginRequest.getIdentifier());
        }

        if (member == null) {
            throw new LoginFailedException(loginRequest.getIdentifier() + "를 찾을 수 없습니다.");
        }

        if (!passwordEncoder.matches(loginRequest.getPassword(), member.getMemberPassword())) {
            log.info("[AuthService] Password Match Failed!");
            throw new LoginFailedException("잘못 된 비밀번호 입니다.");
        }

        TokenDTO tokenDTO = tokenProvider.generateTokenDTO(member);
        log.info("[AuthService] tokenDTO {}", tokenDTO);

        log.info("[AuthService] login() END");
        return new LoginResponse(tokenDTO, member.getMemberId(), member.getMemberCode()); // memberCode 추가
    }


    @Transactional
    public MemberDTO signup(MemberDTO memberDTO) {
        log.info("[AuthService] signup() Start.");
        log.info("[AuthService] memberDTO {}", memberDTO);

        if (memberRepository.findByMemberEmail(memberDTO.getMemberEmail()) != null) {
            log.info("[AuthService] 이메일이 중복됩니다.");
            throw new DuplicatedMemberEmailException("이메일이 중복됩니다.");
        }

        // DTO를 엔티티로 변환
        Member registMember = modelMapper.map(memberDTO, Member.class);
        registMember.setBirthDate(LocalDate.parse(memberDTO.getBirthDate(), DateTimeFormatter.ISO_DATE));
        registMember.setMemberPassword(passwordEncoder.encode(registMember.getMemberPassword()));

        Member result1 = memberRepository.save(registMember);

        int maxMemberCode = memberRepository.maxMemberCode();
        MemberRole registMemberRole = new MemberRole(maxMemberCode, 2);
        MemberRole result2 = memberRoleRepository.save(registMemberRole);

        log.info("[AuthService] Member Insert Result {}",
                (result1 != null && result2 != null) ? "회원 가입 성공" : "회원 가입 실패");

        log.info("[AuthService] signup() End.");

        return memberDTO;
    }
}
