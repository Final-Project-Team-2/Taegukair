package org.taegukair.project.member.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.taegukair.project.member.dto.FamilyDTO;
import org.taegukair.project.member.entity.Family;
import org.taegukair.project.member.entity.Member;
import org.taegukair.project.member.repository.FamilyRepository;
import org.taegukair.project.member.repository.MemberRepository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoField;
import java.util.List;

@Service
public class FamilyService {

    @Autowired
    private FamilyRepository familyRepository;

    @Autowired
    private MemberRepository memberRepository;

    // 날짜 형식을 'yyMMdd'로 설정
    private DateTimeFormatter shortDateFormatter = DateTimeFormatter.ofPattern("yyMMdd");
    private DateTimeFormatter fullDateFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");

    public List<Family> getFamiliesByMemberId(String memberId) {
        Member member = memberRepository.findByMemberId(memberId);
        return familyRepository.findByMember(member);
    }

    public Family getFamilyById(String id) {
        return familyRepository.findById(id).orElse(null);
    }

    public Family saveFamily(FamilyDTO familyDTO) {
        Member member = memberRepository.findById(familyDTO.getMemberCode()).orElseThrow(() -> new RuntimeException("Member not found"));
        Family family = new Family();
        family.setFamilyUserId(familyDTO.getFamilyUserId());
        family.setMember(member);

        // String을 LocalDate로 변환
        LocalDate birthDate = parseDate(familyDTO.getFamilyBirthDate());
        family.setFamilyBirthDate(birthDate);

        family.setFamilyKey(familyDTO.getFamilyKey());
        family.setFamilyRelation(familyDTO.getFamilyRelation());
        family.setFamilyPhone(familyDTO.getFamilyPhone());
        family.setFamilyName(familyDTO.getFamilyName());
        family.setImage(familyDTO.getImage());
        return familyRepository.save(family);
    }

    private LocalDate parseDate(String dateStr) {
        LocalDate date = LocalDate.parse(dateStr, shortDateFormatter);
        int year = date.getYear();
        if (year < 100) {
            year += (year < 70 ? 2000 : 1900);
            date = date.withYear(year);
        }
        return date;
    }

    public void deleteFamily(String id) {
        familyRepository.deleteById(id);
    }
}
