package org.taegukair.project.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.taegukair.project.member.entity.Pet;

public interface PetRepository extends JpaRepository<Pet, Integer> {
}
