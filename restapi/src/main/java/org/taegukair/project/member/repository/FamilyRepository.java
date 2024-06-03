package org.taegukair.project.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.taegukair.project.member.entity.Family;
import org.taegukair.project.member.entity.Member;

import java.util.List;

public interface FamilyRepository extends JpaRepository<Family, String> {
    List<Family> findByMember(Member member);
}
