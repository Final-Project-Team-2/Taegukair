package org.taegukair.project.member.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.taegukair.project.member.dto.MemberDTO;
import org.taegukair.project.member.entity.Member;
import org.taegukair.project.member.repository.MemberRepository;

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
}
