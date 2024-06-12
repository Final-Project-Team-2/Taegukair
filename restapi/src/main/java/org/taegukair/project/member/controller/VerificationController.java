package org.taegukair.project.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.taegukair.project.member.dto.VerificationDTO;
import org.taegukair.project.member.entity.Member;
import org.taegukair.project.member.entity.VerificationCode;
import org.taegukair.project.member.repository.MemberRepository;
import org.taegukair.project.member.repository.VerificationCodeRepository;
import org.taegukair.project.member.service.CoolSMSService;

import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api")
public class VerificationController {

    private static final Logger logger = Logger.getLogger(VerificationController.class.getName());

    @Autowired
    private VerificationCodeRepository verificationCodeRepository;

    @Autowired
    private CoolSMSService coolSMSService;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;  // PasswordEncoder 주입

    @PostMapping("/send-code")
    public ResponseEntity<String> sendCode(@RequestBody VerificationDTO verificationDTO) {

        String phoneNumber = verificationDTO.getPhoneNumber();
        System.out.println("phoneNumber : " + phoneNumber);

        if (!phoneNumber.startsWith("+")) {
            phoneNumber = "+82" + phoneNumber.substring(1);
        }

        String code = String.valueOf((int)(Math.random() * 900000) + 100000);

        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setPhoneNumber(phoneNumber);
        verificationCode.setCode(code);
        verificationCodeRepository.save(verificationCode);

        try {
            coolSMSService.sendSms(phoneNumber, "요청하신 인증번호는 " + code + "입니다.");
            logger.info("Verification code sent to: " + phoneNumber);
            return ResponseEntity.ok("Verification code sent");
        } catch (Exception e) {
            logger.severe("Failed to send verification code to: " + phoneNumber + " Error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send verification code: " + e.getMessage());
        }
    }

    @PostMapping("/verify-code")
    public String verifyCode(@RequestBody VerificationDTO verificationDTO) {

        String phoneNumber = verificationDTO.getPhoneNumber();
        String code = verificationDTO.getCode();

        if (!phoneNumber.startsWith("+")) {
            phoneNumber = "+82" + phoneNumber.substring(1);
        }

        System.out.println("phoneNumber : " + phoneNumber);
        System.out.println("code : " + code);

        Optional<VerificationCode> verificationCode = verificationCodeRepository
                .findByPhoneNumberAndCode(phoneNumber, code);

        if (verificationCode.isPresent()) {
            VerificationCode vCode = verificationCode.get();
            if (!vCode.isVerified()) {
                vCode.setVerified(true);
                verificationCodeRepository.save(vCode);
                logger.info("Verification successful for: " + phoneNumber);
                return "Verification successful";
            } else {
                logger.info("Code has already been used for: " + phoneNumber);
                return "Code has already been used";
            }
        } else {
            logger.info("Invalid verification code for: " + phoneNumber);
            return "Invalid verification code";
        }
    }

    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody VerificationDTO verificationDTO) {

        String memberId = verificationDTO.getMemberId();
        String memberEmail = verificationDTO.getMemberEmail();
        String newPassword = verificationDTO.getNewPassword();

        Optional<Member> member = memberRepository.findByMemberIdAndMemberEmail(memberId, memberEmail);

        if (member.isPresent()) {
            Member m = member.get();
            String encodedPassword = passwordEncoder.encode(newPassword);  // 비밀번호 인코딩
            m.setMemberPassword(encodedPassword);
            memberRepository.save(m);
            logger.info("Password reset successful for member: " + memberId);
            return "Password reset successful";
        } else {
            logger.info("Member not found with ID and Email: " + memberId + ", " + memberEmail);
            return "Member not found";
        }
    }
}
