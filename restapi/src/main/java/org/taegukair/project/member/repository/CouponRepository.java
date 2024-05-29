package org.taegukair.project.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.taegukair.project.member.entity.Coupon;

public interface CouponRepository extends JpaRepository<Coupon, Integer> {
}
