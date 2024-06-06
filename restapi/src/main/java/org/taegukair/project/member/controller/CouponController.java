package org.taegukair.project.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.taegukair.project.member.dto.CouponAssignRequest;
import org.taegukair.project.member.entity.Coupon;
import org.taegukair.project.member.service.CouponService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/coupon")
public class CouponController {

    @Autowired
    private CouponService couponService;

    @GetMapping
    public List<Coupon> getAllCoupons() {
        return couponService.getAllCoupons();
    }

    @GetMapping("/{id}")
    public Coupon getCouponById(@PathVariable int id) {
        return couponService.getCouponById(id);
    }

    @GetMapping("/membercode")
    public List<Coupon> getCouponByMemberCode(@RequestParam int memberCode) {
        return couponService.getCouponByMemberCode(memberCode);
    }

    @GetMapping("/check")
    public Map<String, Object> checkCoupon(@RequestParam String couponCode) {
        boolean isValid = couponService.isCouponValid(couponCode);
        Map<String, Object> response = new HashMap<>();
        response.put("valid", isValid);
        return response;
    }

    @PostMapping("/assign")
    public Map<String, Object> assignCoupon(@RequestBody CouponAssignRequest request) {
        String couponCode = request.getCouponCode();
        int memberCode = request.getMemberCode();

        Map<String, Object> response = new HashMap<>();
        Coupon coupon = couponService.assignCouponToMember(couponCode, memberCode);

        if (coupon != null) {
            response.put("valid", true);
            response.put("coupon", coupon);
        } else {
            response.put("valid", false);
            response.put("message", "쿠폰 번호가 유효하지 않거나 이미 사용되었습니다.");
        }

        return response;
    }

    @PostMapping
    public Coupon createCoupon(@RequestBody Coupon coupon) {
        return couponService.saveCoupon(coupon);
    }

    @PutMapping("/{id}")
    public Coupon updateCoupon(@PathVariable int id, @RequestBody Coupon coupon) {
        coupon.setCouponId(id);
        return couponService.saveCoupon(coupon);
    }

    @DeleteMapping("/{id}")
    public void deleteCoupon(@PathVariable int id) {
        couponService.deleteCoupon(id);
    }
}
