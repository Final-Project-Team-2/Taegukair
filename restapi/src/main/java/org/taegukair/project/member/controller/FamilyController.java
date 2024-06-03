package org.taegukair.project.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping
    public Family createFamily(@RequestBody FamilyDTO familyDTO) {
        System.out.println("Received FamilyDTO: " + familyDTO); // 디버깅용 로그 추가
        return familyService.saveFamily(familyDTO);
    }

    @PutMapping("/{familyUserId}")
    public ResponseEntity<Family> updateFamily(@PathVariable String familyUserId, @RequestBody FamilyDTO familyDTO) {
        try {
            Family updatedFamily = familyService.updateFamily(familyUserId, familyDTO);
            return ResponseEntity.ok(updatedFamily);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteFamily(@PathVariable String id) {
        familyService.deleteFamily(id);
    }
}
