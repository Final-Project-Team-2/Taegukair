-- 권한(Authority) 테이블에 대한 더미 데이터
INSERT INTO authority (authority_name, authority_desc) VALUES
    ('ROLE_ADMIN', '관리자 계정'),
    ('ROLE_USER', '일반 유저');

-- 회원(Member) 테이블에 대한 더미 데이터
INSERT INTO member (member_id, member_password, member_email, member_name, member_gender, birth_date, member_phone) VALUES
    ('admin', '$2a$10$Q6ryDWturyqyQ/3kQkkw5.rIJY8D/.uvFOwOyqhUtUlBNI/A2Lswm', 'admin@example.com', 'User One', 'Female', '1990-01-01', '010-1010-1010'),
    ('user77', '$2a$10$Q6ryDWturyqyQ/3kQkkw5.rIJY8D/.uvFOwOyqhUtUlBNI/A2Lswm', 'wade@example.com', '웨이드', 'Male', '1998-03-28', '010-1111-1111'),
    ('user2', 'pw2', 'user2@example.com', 'User Two', 'Female', '1992-02-02', '010-2222-2222'),
    ('user3', 'pw3', 'user3@example.com', 'User Three', 'Male', '1993-03-03', '010-3333-3333'),
    ('user4', 'pw4', 'user4@example.com', 'User Four', 'Female', '1994-04-04', '010-4444-4444'),
    ('user5', 'pw5', 'user5@example.com', 'User Five', 'Male', '1995-05-05', '010-5555-5555'),
    ('user6', 'pw6', 'user6@example.com', 'User Six', 'Female', '1996-06-06', '010-6666-6666'),
    ('user7', 'pw7', 'user7@example.com', 'User Seven', 'Male', '1997-07-07', '010-7777-7777'),
    ('user8', 'pw8', 'user8@example.com', 'User Eight', 'Female', '1998-08-08', '010-8888-8888'),
    ('user9', 'pw9', 'user9@example.com', 'User Nine', 'Male', '1999-09-09', '010-9999-9999'),
    ('user10', 'pw10', 'user10@example.com', 'User Ten', 'Female', '2000-10-10', '010-1010-1010');

INSERT INTO member_role (member_code, authority_code)
SELECT
    m.member_code,
    a.authority_code
FROM
    member m,
    authority a
WHERE
        m.member_id = 'admin'
    AND a.authority_name = 'ROLE_ADMIN';

INSERT INTO member_role (member_code, authority_code)
SELECT
    m.member_code,
    a.authority_code
FROM
    member m,
    authority a
WHERE
        m.member_id = 'wade'
    AND a.authority_name = 'ROLE_USER';

-- 공항(Airport) 테이블에 대한 더미 데이터
INSERT INTO airport (airport_Name, airport_Iata, airport_location) VALUES
    ('Incheon International Airport', 'ICN', 'Incheon'),
    ('Gimpo International Airport', 'GMP', 'Seoul'),
    ('Gimhae International Airport', 'PUS', 'Busan'),
    ('Jeju International Airport', 'CJU', 'Jeju'),
    ('Daegu International Airport', 'TAE', 'Daegu'),
    ('Cheongju International Airport', 'CJJ', 'Cheongju'),
    ('Muan International Airport', 'MWX', 'Muan'),
    ('Yangyang International Airport', 'YNY', 'Yangyang'),
    ('Gwangju Airport', 'KWJ', 'Gwangju'),
    ('Ulsan Airport', 'USN', 'Ulsan');

-- 비행기(Airplane) 테이블에 대한 더미 데이터
INSERT INTO airplane (airplane_Type, airplane_No, airplane_Seat) VALUES
    ('Oeing 172', 'O172-1', 30),
    ('Airbus A380', 'A380-1', 555),
    ('Boeing 777', 'B777-1', 396),
    ('Airbus A350', 'A350-1', 440),
    ('Boeing 737', 'B737-1', 188),
    ('Airbus A320', 'A320-1', 150),
    ('Boeing 787', 'B787-1', 290),
    ('Airbus A330', 'A330-1', 300),
    ('Boeing 767', 'B767-1', 261),
    ('Airbus A220', 'A220-1', 160);

-- 좌석 등급(Seat_Class) 테이블에 대한 더미 데이터
INSERT INTO seat_class (seat_class_name, seat_class_price) VALUES
    ('First', 50000),
    ('Business', 30000),
    ('Economy', 10000);

-- 좌석 유형(Seat_Type) 테이블에 대한 더미 데이터
INSERT INTO seat_type (seat_type_name, seat_type_price) VALUES
    ('Window', 10000),
    ('Pet seat', 5000),
    ('Extra Legroom', 20000),
    ('Standard', 0);

-- 비행(Flight) 테이블에 대한 더미 데이터
INSERT INTO flight (start_Time, end_Time, airplane_ID, departure_airport_ID, arrival_airport_ID, flight_Price) VALUES
    ('2024-06-01 08:00:00', '2024-06-01 10:00:00', 1, 1, 2, 150000),
    ('2024-06-01 11:00:00', '2024-06-01 13:00:00', 2, 2, 3, 200000),
    ('2024-06-01 14:00:00', '2024-06-01 16:00:00', 3, 3, 4, 180000),
    ('2024-06-01 17:00:00', '2024-06-01 19:00:00', 4, 4, 5, 220000),
    ('2024-06-01 20:00:00', '2024-06-01 22:00:00', 5, 5, 6, 250000),
    ('2024-06-02 08:00:00', '2024-06-02 10:00:00', 6, 6, 7, 150000),
    ('2024-06-02 11:00:00', '2024-06-02 13:00:00', 7, 7, 8, 200000),
    ('2024-06-02 14:00:00', '2024-06-02 16:00:00', 8, 8, 9, 180000),
    ('2024-06-02 17:00:00', '2024-06-02 19:00:00', 9, 9, 10, 220000),
    ('2024-06-02 20:00:00', '2024-06-02 22:00:00', 10, 10, 1, 250000);

-- 좌석(Seat) 테이블에 대한 더미 데이터
INSERT INTO seat (flight_ID, seat_no, seat_type_id, seat_class_id, is_reserved) VALUES
    (1, 'A1', 1, 1, 1), (1, 'A2', 4, 1, 0), (1, 'A3', 4, 1, 0), (1, 'A4', 1, 1, 0),
    (1, 'B1', 1, 2, 0), (1, 'B2', 4, 2, 0), (1, 'B3', 4, 2, 0), (1, 'B4', 1, 2, 0),
    (1, 'C1', 1, 2, 0), (1, 'C2', 4, 2, 0), (1, 'C3', 4, 2, 0), (1, 'C4', 1, 2, 0),
    (1, 'D1', 1, 3, 0), (1, 'D2', 4, 3, 0), (1, 'D3', 4, 3, 0), (1, 'D4', 1, 3, 0),
    (1, 'E1', 1, 3, 0), (1, 'E2', 4, 3, 0), (1, 'E3', 4, 3, 0), (1, 'E4', 1, 3, 0),
    (1, 'F1', 1, 3, 0), (1, 'F2', 4, 3, 0), (1, 'F3', 4, 3, 0), (1, 'F4', 1, 3, 0),
    (1, 'G1', 3, 3, 0), (1, 'G2', 3, 3, 0), (1, 'G3', 3, 3, 0), (1, 'G4', 3, 3, 0),
    (1, 'H1', 1, 3, 0), (1, 'H2', 4, 3, 0), (1, 'H3', 4, 3, 0), (1, 'H4', 1, 3, 0),
    (1, 'I1', 2, 3, 0), (1, 'I2', 4, 3, 0), (1, 'I3', 2, 3, 0), (1, 'I4', 1, 3, 0),
    (1, 'J1', 2, 3, 0), (1, 'J2', 4, 3, 0), (1, 'J3', 4, 3, 0), (1, 'J4', 1, 3, 0);

-- 비밀번호 재설정(Password_Reset) 테이블에 대한 더미 데이터
INSERT INTO password_reset (reset_Token, token_Expiration, member_code) VALUES
    ('token1', '2024-06-01 12:00:00', 2);

-- 가족(Family) 테이블에 대한 더미 데이터
INSERT INTO family (family_user_id, member_code, family_birth_date, family_key, family_relation, family_phone, family_name) VALUES
    ('fam1', 1, '2000-01-01', 1, 'Father', '010-1111-1111', 'Father One'),
    ('fam2', 2, '2002-02-02', 2, 'Mother', '010-2222-2222', 'Mother Two'),
    ('fam3', 3, '2003-03-03', 3, 'Brother', '010-3333-3333', 'Brother Three'),
    ('fam4', 4, '2004-04-04', 4, 'Sister', '010-4444-4444', 'Sister Four'),
    ('fam5', 5, '2005-05-05', 5, 'Son', '010-5555-5555', 'Son Five'),
    ('fam6', 6, '2006-06-06', 6, 'Daughter', '010-6666-6666', 'Daughter Six'),
    ('fam7', 7, '2007-07-07', 7, 'Uncle', '010-7777-7777', 'Uncle Seven'),
    ('fam8', 8, '2008-08-08', 8, 'Aunt', '010-8888-8888', 'Aunt Eight'),
    ('fam9', 9, '2009-09-09', 9, 'Cousin', '010-9999-9999', 'Cousin Nine'),
    ('fam10', 10, '2000-01-01', 10, 'Father', '010-1004-1004', 'Father Ten');

-- 애완동물(Pet) 테이블에 대한 더미 데이터
INSERT INTO pet (member_code, pet_Name, species, breed) VALUES
    (1, 'Apple', 'Dog', 'Golden Retriever'),
    (2, 'Buddy', 'Dog', 'Golden Retriever'),
    (3, 'Mittens', 'Cat', 'Siamese'),
    (4, 'Charlie', 'Dog', 'Beagle'),
    (5, 'Bella', 'Cat', 'Persian'),
    (6, 'Max', 'Dog', 'Bulldog'),
    (7, 'Luna', 'Cat', 'Maine Coon'),
    (8, 'Rocky', 'Dog', 'Poodle'),
    (9, 'Simba', 'Cat', 'Bengal'),
    (10, 'Buddy', 'Cat', 'Persian');

-- 쿠폰(Coupon) 테이블에 대한 더미 데이터
INSERT INTO coupon (member_code, coupon_code, discount_amount, discount_percentage, valid_until, is_possible) VALUES
    (1, 'C1001', 100000, 8, '2024-12-31', true),
    (2, 'C1002', 20000, 15, '2024-12-31', true),
    (3, 'C1003', 15000, 20, '2024-12-31', true),
    (4, 'C1004', 30000, 25, '2024-12-31', true),
    (5, 'C1005', 5000, 5, '2024-12-31', true),
    (6, 'C1006', 25000, 30, '2024-12-31', true),
    (7, 'C1007', 35000, 35, '2024-12-31', true),
    (8, 'C1008', 40000, 40, '2024-12-31', true),
    (9, 'C1009', 45000, 45, '2024-12-31', true),
    (10, 'C1010', 30000, 15, '2024-12-31', true);

-- 게시판(Board) 테이블에 대한 더미 데이터
INSERT INTO board (member_code, title, content, submission_date, status, answer) VALUES
    (1, 'Title 1', 'Content 1', '2024-06-01', 'false', '오늘은 일 하기 싫어요.'),
    (2, 'Title 2', 'Content 2', '2024-06-02', 'false', '난 오늘도 배고프다.'),
    (3, 'Title 3', 'Content 3', '2024-06-03', 'true', '이것도 질문이에요?'),
    (4, 'Title 4', 'Content 4', '2024-06-04', 'false', '할 수 있습니다!'),
    (5, 'Title 5', 'Content 5', '2024-06-05', 'true', '행복한 하루 보내세요.'),
    (6, 'Title 6', 'Content 6', '2024-06-06', 'false', '좋은 일이 있을거에요.'),
    (7, 'Title 7', 'Content 7', '2024-06-07', 'true', '비행기 안타요'),
    (8, 'Title 8', 'Content 8', '2024-06-08', 'false', '관둘겁니다 저 이제 당신 때문에'),
    (9, 'Title 9', 'Content 9', '2024-06-09', 'true', '당신 때문에 너무 힘들어요'),
    (10, 'Title 10', 'Content 10', '2024-06-09', 'true', '월급 받기 힘들다..');

-- 예약(Reservation) 테이블에 대한 더미 데이터
INSERT INTO reservation (Reservation_No, member_code, flight_ID, seat_id, coupon_id, baggage_amount, extra_baggage_amount, baggage_price, reservation_Date) VALUES
    ('R1001', 1, 1, '1', 1, 2, 1, 50000, '2024-06-01'),
    ('R1002', 2, 2, '2', 2, 1, 0, 25000, '2024-06-02'),
    ('R1003', 3, 3, '3', 3, 3, 2, 75000, '2024-06-03'),
    ('R1004', 4, 4, '4', 4, 1, 1, 50000, '2024-06-04'),
    ('R1005', 5, 5, '5', 5, 2, 0, 25000, '2024-06-05'),
    ('R1006', 6, 6, '6', 6, 3, 2, 75000, '2024-06-06'),
    ('R1007', 7, 7, '7', 7, 1, 1, 50000, '2024-06-07'),
    ('R1008', 8, 8, '8', 8, 2, 0, 25000, '2024-06-08'),
    ('R1009', 9, 9, '9', 9, 3, 2, 75000, '2024-06-09'),
    ('R1010', 10, 10, '10', 10, 1, 1, 50000, '2024-06-10');