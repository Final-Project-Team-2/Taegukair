package org.taegukair.project.member.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.taegukair.project.member.dto.FamilyDTO;
import org.taegukair.project.member.entity.Family;
import org.taegukair.project.member.entity.Member;
import org.taegukair.project.member.repository.FamilyRepository;
import org.taegukair.project.member.repository.MemberRepository;

import java.util.List;

@Service
public class FamilyService {

    @Autowired
    private FamilyRepository familyRepository;

    @Autowired
    private MemberRepository memberRepository;

    public List<Family> getFamiliesByMemberId(String memberId) {
        Member member = memberRepository.findByMemberId(memberId);
        return familyRepository.findByMember(member);
    }

    public Family getFamilyById(String id) {
        return familyRepository.findById(id).orElse(null);
    }

    public Family saveFamily(FamilyDTO familyDTO) {
        System.out.println("Saving Family with FamilyDTO: " + familyDTO); // 디버깅용 로그 추가
        Member member = memberRepository.findByMemberCode(familyDTO.getMemberCode());
        if (member == null) {
            throw new RuntimeException("Member not found with memberCode: " + familyDTO.getMemberCode());
        }

        Family family = new Family();
        family.setFamilyUserId(familyDTO.getFamilyUserId());
        family.setMember(member);

        LocalDate birthDate = parseDate(familyDTO.getFamilyBirthDate());
        family.setFamilyBirthDate(birthDate);

        family.setFamilyKey(familyDTO.getFamilyKey());
        family.setFamilyRelation(familyDTO.getFamilyRelation());
        family.setFamilyPhone(familyDTO.getFamilyPhone());
        family.setFamilyName(familyDTO.getFamilyName());
        family.setImage(familyDTO.getImage());
        return familyRepository.save(family);
    }

    public Family updateFamily(String familyUserId, FamilyDTO familyDTO) {
        Family existingFamily = familyRepository.findById(familyUserId)
                .orElseThrow(() -> new RuntimeException("Family member not found"));

        Member member = memberRepository.findByMemberCode(familyDTO.getMemberCode());
        if (member == null) {
            throw new RuntimeException("Member not found with memberCode: " + familyDTO.getMemberCode());
        }

        existingFamily.setMember(member);

        LocalDate birthDate = parseDate(familyDTO.getFamilyBirthDate());
        existingFamily.setFamilyBirthDate(birthDate);

        existingFamily.setFamilyKey(familyDTO.getFamilyKey());
        existingFamily.setFamilyRelation(familyDTO.getFamilyRelation());
        existingFamily.setFamilyPhone(familyDTO.getFamilyPhone());
        existingFamily.setFamilyName(familyDTO.getFamilyName());
        existingFamily.setImage(familyDTO.getImage());

        return familyRepository.save(existingFamily);
    }


    private LocalDate parseDate(String dateStr) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
            return LocalDate.parse(dateStr, formatter);
        } catch (DateTimeParseException e) {
            throw new RuntimeException("Invalid date format: " + dateStr);
        }
    }


    public void deleteFamily(String id) {
        familyRepository.deleteById(id);
    }
}
