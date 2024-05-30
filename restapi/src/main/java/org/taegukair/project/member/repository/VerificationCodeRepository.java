package org.taegukair.project.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.taegukair.project.member.entity.VerificationCode;

import java.util.Optional;

public interface VerificationCodeRepository extends JpaRepository<VerificationCode, Long> {
    Optional<VerificationCode> findByPhoneNumberAndCode(String phoneNumber, String code);
}
