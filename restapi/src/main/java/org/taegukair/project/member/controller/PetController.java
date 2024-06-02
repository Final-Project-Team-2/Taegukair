package org.taegukair.project.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
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

    @PutMapping("/{id}")
    public Pet updatePet(@PathVariable int id, @RequestBody PetDTO petDTO) {
        petDTO.setPetId(id);
        return petService.savePet(petDTO);
    }

    @DeleteMapping("/{id}")
    public void deletePet(@PathVariable int id) {
        petService.deletePet(id);
    }
}
