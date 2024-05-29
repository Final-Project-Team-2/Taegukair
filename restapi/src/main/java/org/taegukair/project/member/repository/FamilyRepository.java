package org.taegukair.project.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.taegukair.project.member.entity.Family;

public interface FamilyRepository extends JpaRepository<Family, String> {
}
