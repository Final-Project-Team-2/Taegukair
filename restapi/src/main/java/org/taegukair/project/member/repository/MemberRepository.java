package org.taegukair.project.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.taegukair.project.member.entity.Member;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {

    // 특정 회원 ID로 회원 조회
    Member findByMemberId(String memberId);

    // 특정 회원 번호로 회원 조회
    Member findByMemberCode(int memberCode);

    // 특정 회원 이메일로 회원 조회
    Member findByMemberEmail(String memberEmail);

    // 특정 회원 이메일, 생일, 이름으로 회원 조회
    Member findByMemberEmailAndBirthDateAndMemberName(String memberEmail, LocalDate birthDate, String memberName);

    // 특정 회원 ID로 회원 삭제
    void deleteByMemberId(String memberId);

    /* 설명. JPQL과 @Query를 활용한 구문 */
    @Query("SELECT MAX(m.memberCode) FROM Member m")    // 설명. JPQL에서 엔티티 이름은 대소문자까지 완벽히 일치할 것!
    int maxMemberCode();

    /* 설명. purchase 도메인 추가하면서 추가한 메소드 */
    @Query("SELECT m.memberCode FROM Member m WHERE m.memberId = ?1")
    int findMemberCodeByMemberId(String orderMemberId);

    // 모든 회원 조회 (JpaRepository에서 기본 제공)
    @Override
    List<Member> findAll();

    // 특정 회원 ID와 이메일로 회원 조회 (새로 추가된 메소드)
    Optional<Member> findByMemberIdAndMemberEmail(String memberId, String memberEmail);
}
