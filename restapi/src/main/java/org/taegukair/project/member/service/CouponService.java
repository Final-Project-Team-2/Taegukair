package org.taegukair.project.member.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.taegukair.project.member.entity.Coupon;
import org.taegukair.project.member.repository.CouponRepository;
import org.taegukair.project.reservation.entity.Reservation;

import java.util.List;
import java.util.Optional;

@Service
public class CouponService {

    @Autowired
    private CouponRepository couponRepository;

    public List<Coupon> getAllCoupons() {
        return couponRepository.findAll();
    }

    public Coupon getCouponById(int id) {
        return couponRepository.findById(id).orElse(null);
    }

    public List<Coupon> getCouponByMemberCode(int memberCode) {

        List<Coupon> coupon = couponRepository.findByMemberCode(memberCode);

        if (coupon.isEmpty()) {
            throw new RuntimeException("해당 회원 코드에 대한 쿠폰을 찾을 수 없습니다.");
        }

        return coupon;
    }

    public Coupon saveCoupon(Coupon coupon) {
        return couponRepository.save(coupon);
    }

    public void deleteCoupon(int id) {
        couponRepository.deleteById(id);
    }
}
