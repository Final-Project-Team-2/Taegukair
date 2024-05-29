package org.taegukair.project.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.taegukair.project.member.entity.Family;
import org.taegukair.project.member.service.FamilyService;

import java.util.List;

@RestController
@RequestMapping("/api/family")
public class FamilyController {

    @Autowired
    private FamilyService familyService;

    @GetMapping
    public List<Family> getAllFamilies() {
        return familyService.getAllFamilies();
    }

    @GetMapping("/{id}")
    public Family getFamilyById(@PathVariable String id) {
        return familyService.getFamilyById(id);
    }

    @PostMapping
    public Family createFamily(@RequestBody Family family) {
        return familyService.saveFamily(family);
    }

    @PutMapping("/{id}")
    public Family updateFamily(@PathVariable String id, @RequestBody Family family) {
        family.setFamilyUserId(id);
        return familyService.saveFamily(family);
    }

    @DeleteMapping("/{id}")
    public void deleteFamily(@PathVariable String id) {
        familyService.deleteFamily(id);
    }
}
