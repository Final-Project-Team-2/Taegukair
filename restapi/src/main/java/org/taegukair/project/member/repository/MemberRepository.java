package org.taegukair.project.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.taegukair.project.member.entity.Member;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Integer> {

    // 특정 회원 ID로 회원 조회
    Member findByMemberId(String memberId);

    // 특정 회원 이메일로 회원 조회
    Member findByMemberEmail(String memberEmail);

    /* 설명. JPQL과 @Query를 활용한 구문 */
    @Query("SELECT MAX(m.memberCode) FROM Member m")    // 설명. JPQL에서 엔티티 이름은 대소문자까지 완벽히 일치할 것!
    int maxMemberCode();

    /* 설명. purchase 도메인 추가하면서 추가한 메소드 */
    @Query("SELECT m.memberCode FROM Member m WHERE m.memberId = ?1")
    int findMemberCodeByMemberId(String orderMemberId);


    // 모든 회원 조회 (JpaRepository에서 기본 제공)
    @Override
    List<Member> findAll();

}
