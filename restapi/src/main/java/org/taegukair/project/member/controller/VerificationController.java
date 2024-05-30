package org.taegukair.project.member.controller;

import net.nurigo.java_sdk.exceptions.CoolsmsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.taegukair.project.member.entity.VerificationCode;
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

    @PostMapping("/send-code")
    public String sendCode(@RequestParam String phoneNumber) {
        if (!phoneNumber.startsWith("+")) {
            phoneNumber = "+82" + phoneNumber.substring(1);
        }

        String code = String.valueOf((int)(Math.random() * 900000) + 100000);

        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setPhoneNumber(phoneNumber);
        verificationCode.setCode(code);
        verificationCodeRepository.save(verificationCode);

        try {
            coolSMSService.sendSms(phoneNumber, "Your verification code is " + code);
            logger.info("Verification code sent to: " + phoneNumber);
            return "Verification code sent";
        } catch (CoolsmsException e) {
            logger.severe("Failed to send verification code to: " + phoneNumber + " Error: " + e.getMessage());
            return "Failed to send verification code: " + e.getMessage();
        }
    }

    @PostMapping("/verify-code")
    public String verifyCode(@RequestParam String phoneNumber, @RequestParam String code) {
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
}
