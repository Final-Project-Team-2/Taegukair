package org.taegukair.project.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.taegukair.project.member.dto.PetDTO;
import org.taegukair.project.member.entity.Pet;
import org.taegukair.project.member.service.PetService;

import java.util.List;

@RestController
@RequestMapping("/api/pet")
public class PetController {

    @Autowired
    private PetService petService;

    @GetMapping("/member/{memberId}")
    public List<Pet> getPetsByMemberId(@PathVariable String memberId) {
        return petService.getPetsByMemberId(memberId);
    }

    @PostMapping
    public Pet createPet(@RequestBody PetDTO petDTO) {
        return petService.savePet(petDTO);
    }

    @PutMapping("/{petId}")
    public ResponseEntity<Pet> updatePet(@PathVariable int petId, @RequestBody PetDTO petDTO) {
        try {
            System.out.println("Updating pet with ID: " + petId);
            System.out.println("PetDTO: " + petDTO);
            System.out.println("PetDTO memberCode: " + petDTO.getMemberCode());
            if (petDTO.getMemberCode() == 0) {
                throw new RuntimeException("Invalid member code");
            }
            Pet updatedPet = petService.updatePet(petId, petDTO);
            return ResponseEntity.ok(updatedPet);
        } catch (RuntimeException e) {
            e.printStackTrace(); // 콘솔에 예외 전체 스택 트레이스를 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public void deletePet(@PathVariable int id) {
        petService.deletePet(id);
    }
}
