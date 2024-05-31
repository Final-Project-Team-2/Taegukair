package org.taegukair.project.member.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.taegukair.project.member.dto.MemberDTO;
import org.taegukair.project.member.entity.Member;
import org.taegukair.project.member.repository.MemberRepository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MemberService {

	private static final Logger log = LoggerFactory.getLogger(MemberService.class);
	private final MemberRepository memberRepository;
	private final ModelMapper modelMapper;

	@Autowired
	public MemberService(MemberRepository memberRepository, ModelMapper modelMapper) {
		this.memberRepository = memberRepository;
		this.modelMapper = modelMapper;
	}

	public MemberDTO selectMyInfo(String memberId) {
		log.info("[MemberService] getMyInfo Start =======================");

		Member member = memberRepository.findByMemberId(memberId);
		log.info("[MemberService] {}", member);
		log.info("[MemberService] getMyInfo End =========================");

		return modelMapper.map(member, MemberDTO.class);
	}

	public List<MemberDTO> selectAllMembers() {
		log.info("[MemberService] selectAllMembers Start =======================");

		List<Member> members = memberRepository.findAll();
		List<MemberDTO> memberDTOs = members.stream()
				.map(member -> modelMapper.map(member, MemberDTO.class))
				.collect(Collectors.toList());

		log.info("[MemberService] selectAllMembers End =========================");

		return memberDTOs;
	}

	// 회원가입 로직 추가
	public MemberDTO signup(MemberDTO memberDTO) {
		log.info("[MemberService] signup Start =======================");
		log.info("[MemberService] Converting DTO to Entity: {}", memberDTO);

		Member member = modelMapper.map(memberDTO, Member.class);
		Member savedMember = memberRepository.save(member);

		log.info("[MemberService] Saved Member: {}", savedMember);
		log.info("[MemberService] signup End =========================");

		return modelMapper.map(savedMember, MemberDTO.class);
	}

	// 회원탈퇴 로직 추가
	public void deleteMember(String memberId) {
		log.info("[MemberService] deleteMember Start =======================");

		Member member = memberRepository.findByMemberId(memberId);
		if (member != null) {
			memberRepository.delete(member);
			log.info("[MemberService] Member deleted: {}", memberId);
		} else {
			log.warn("[MemberService] Member not found: {}", memberId);
		}

		log.info("[MemberService] deleteMember End =========================");
	}

	// 회원정보 수정 로직 추가
	public MemberDTO updateMember(MemberDTO memberDTO) {
		log.info("[MemberService] updateMember Start =======================");

		Optional<Member> optionalMember = memberRepository.findById(memberDTO.getMemberCode());
		if (optionalMember.isPresent()) {
			Member existingMember = optionalMember.get();
			existingMember.setMemberId(memberDTO.getMemberId());
			existingMember.setMemberPassword(memberDTO.getPassword());
			existingMember.setMemberEmail(memberDTO.getMemberEmail());
			existingMember.setMemberName(memberDTO.getMemberName());

			// String을 LocalDate로 변환하여 설정
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
			LocalDate birthDate = LocalDate.parse(memberDTO.getBirthDate(), formatter);
			existingMember.setBirthDate(birthDate);

			Member updatedMember = memberRepository.save(existingMember);
			log.info("[MemberService] Member updated: {}", updatedMember);

			log.info("[MemberService] updateMember End =========================");
			return modelMapper.map(updatedMember, MemberDTO.class);
		} else {
			log.warn("[MemberService] Member not found: {}", memberDTO.getMemberCode());
			return null;
		}
	}

	public String findIdByEmailAndBirthDateAndName(String email, String birthDateStr, String name) {
		log.info("[AuthService] findIdByEmailAndBirthDateAndName() START");
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
		LocalDate birthDate = LocalDate.parse(birthDateStr, formatter);
		Member member = memberRepository.findByMemberEmailAndBirthDateAndMemberName(email, birthDate, name);
		log.info("[AuthService] Member found: {}", member);
		if (member != null) {
			return member.getMemberId();
		}
		log.info("[AuthService] Member not found");
		return null;
	}

}
