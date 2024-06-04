package org.taegukair.project.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.taegukair.project.member.entity.Coupon;

import java.util.List;
import java.util.Optional;

public interface CouponRepository extends JpaRepository<Coupon, Integer> {
    List<Coupon> findByMemberCode(int memberCode);
}
