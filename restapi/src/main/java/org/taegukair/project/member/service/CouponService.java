package org.taegukair.project.member.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.taegukair.project.member.entity.Coupon;
import org.taegukair.project.member.repository.CouponRepository;

import java.util.List;

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
        return couponRepository.findByMemberCode(memberCode);
    }

    public boolean isCouponValid(String couponCode) {
        List<Coupon> coupons = couponRepository.findByCouponCode(couponCode);
        return coupons.stream().anyMatch(Coupon::isPossible);
    }

    public Coupon assignCouponToMember(String couponCode, int memberCode) {
        List<Coupon> coupons = couponRepository.findByCouponCode(couponCode);
        for (Coupon coupon : coupons) {
            if (!coupon.isPossible()) {
                coupon.setMemberCode(memberCode);
                coupon.setPossible(true);
                return couponRepository.save(coupon);
            }
        }
        return null;
    }


    public Coupon saveCoupon(Coupon coupon) {
        return couponRepository.save(coupon);
    }

    public void deleteCoupon(int id) {
        couponRepository.deleteById(id);
    }
}
