package org.taegukair.project.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.taegukair.project.member.dto.FamilyDTO;
import org.taegukair.project.member.entity.Family;
import org.taegukair.project.member.service.FamilyService;

import java.util.List;

@RestController
@RequestMapping("/api/family")
public class FamilyController {

    @Autowired
    private FamilyService familyService;

    @GetMapping("/member/{memberId}")
    public List<Family> getFamiliesByMemberId(@PathVariable String memberId) {
        return familyService.getFamiliesByMemberId(memberId);
    }

    @GetMapping("/{id}")
    public Family getFamilyById(@PathVariable String id) {
        return familyService.getFamilyById(id);
    }

    @PostMapping
    public Family createFamily(@RequestBody FamilyDTO familyDTO) {
        return familyService.saveFamily(familyDTO);
    }

    @PutMapping("/{id}")
    public Family updateFamily(@PathVariable String id, @RequestBody FamilyDTO familyDTO) {
        familyDTO.setFamilyUserId(id);
        return familyService.saveFamily(familyDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteFamily(@PathVariable String id) {
        familyService.deleteFamily(id);
    }
}
