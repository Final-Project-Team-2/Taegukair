package org.taegukair.project.member.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.taegukair.project.member.dto.PetDTO;
import org.taegukair.project.member.entity.Pet;
import org.taegukair.project.member.entity.Member;
import org.taegukair.project.member.repository.PetRepository;
import org.taegukair.project.member.repository.MemberRepository;

import java.util.List;

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private MemberRepository memberRepository;

    public List<Pet> getPetsByMemberId(String memberId) {
        Member member = memberRepository.findByMemberId(memberId);
        return petRepository.findByMember(member);
    }

    public Pet getPetById(int id) {
        return petRepository.findById(id).orElse(null);
    }

    public Pet savePet(PetDTO petDTO) {
        System.out.println("Received memberCode: " + petDTO.getMemberCode()); // 디버깅용 로그 추가
        Member member = memberRepository.findByMemberCode(petDTO.getMemberCode());
        if (member == null) {
            throw new RuntimeException("Member not found");
        }
        Pet pet = new Pet();
        pet.setPetId(petDTO.getPetId());
        pet.setMember(member);
        pet.setPetName(petDTO.getPetName());
        pet.setSpecies(petDTO.getSpecies());
        pet.setBreed(petDTO.getBreed());
        pet.setImage(petDTO.getImage());
        return petRepository.save(pet);
    }

    public Pet updatePet(int petId, PetDTO petDTO) {
        Pet existingPet = petRepository.findById(petId)
                .orElseThrow(() -> new RuntimeException("Pet not found"));

        Member member = memberRepository.findByMemberCode(petDTO.getMemberCode());
        if (member == null) {
            throw new RuntimeException("Member not found");
        }

        existingPet.setPetName(petDTO.getPetName());
        existingPet.setSpecies(petDTO.getSpecies());
        existingPet.setBreed(petDTO.getBreed());
        existingPet.setImage(petDTO.getImage());
        existingPet.setMember(member);

        return petRepository.save(existingPet);
    }




    public void deletePet(int id) {
        petRepository.deleteById(id);
    }
}
