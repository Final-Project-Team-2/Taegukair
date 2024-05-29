package org.taegukair.project.member.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.taegukair.project.member.dto.MemberDTO;
import org.taegukair.project.member.entity.Member;
import org.taegukair.project.member.repository.MemberRepository;

import java.util.List;
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
}
