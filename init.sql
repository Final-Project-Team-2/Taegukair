-- --------------------------------------------------------
-- db 생성 및 유저 권한 할당
-- --------------------------------------------------------
create database if not exists taegukair;

create user if not exists 'taegukair'@'%' identified by 'taegukair';
grant all privileges on taegukair.* to 'taegukair'@'%';

use taegukair;


-- --------------------------------------------------------
-- ddl
-- --------------------------------------------------------
DROP TABLE IF EXISTS reservation;
DROP TABLE IF EXISTS seat;
DROP TABLE IF EXISTS flight;
DROP TABLE IF EXISTS airplane;
DROP TABLE IF EXISTS airport;
DROP TABLE IF EXISTS pet;
DROP TABLE IF EXISTS family;
DROP TABLE IF EXISTS password_reset;
DROP TABLE IF EXISTS coupon;
DROP TABLE IF EXISTS board;
DROP TABLE IF EXISTS member_role;
DROP TABLE IF EXISTS authority;
DROP TABLE IF EXISTS member;
DROP TABLE IF EXISTS seat_type;
DROP TABLE IF EXISTS seat_class;
DROP TABLE IF EXISTS verification_code;
DROP TABLE IF EXISTS verification_token;


show tables;

CREATE TABLE verification_code (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    phone_number VARCHAR(255) NOT NULL,
    code VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    verified BOOLEAN NOT NULL
);


-- 테이블 생성
CREATE TABLE IF NOT EXISTS member
(
    member_code INT AUTO_INCREMENT COMMENT '회원식별코드',
    member_id VARCHAR(255) UNIQUE NOT NULL COMMENT '아이디',
    member_name VARCHAR(255) NOT NULL COMMENT '회원이름',
    member_password VARCHAR(255) NOT NULL COMMENT '비밀번호',
    member_email VARCHAR(255) NOT NULL COMMENT '이메일',
    member_gender VARCHAR(255) NOT NULL COMMENT '성별',
    birth_date DATE NOT NULL,
    member_phone VARCHAR(255) NOT NULL,
    CONSTRAINT pk_member_code PRIMARY KEY (member_code)
) ENGINE=InnoDB COMMENT '회원';

-- AUTO_INCREMENT 값 설정
ALTER TABLE member AUTO_INCREMENT = 20231115;


-- tbl_authority(권한)
create table if not exists authority
(
-- column level constraints
    authority_code int auto_increment comment '권한식별코드',
    authority_name varchar(255) not null comment '권한명',
    authority_desc varchar(4000) not null comment '권한설명',
    -- table level constraints
    constraint pk_authority_code primary key (authority_code)
) engine=innodb comment '권한';


-- tbl_member_role(회원별권한)
create table if not exists member_role
(
    -- column level constraints
    member_code int not null comment '회원식별코드',
    authority_code int not null comment '권한식별코드',
    -- table level constraints
    constraint pk_member_role primary key (member_code, authority_code),
    FOREIGN KEY (member_code) REFERENCES member (member_code),
    FOREIGN KEY (authority_code) REFERENCES authority (authority_code)
) engine=innodb comment '회원별권한';

-- 독립적인 테이블 생성
CREATE TABLE airport (
    airport_ID int NOT NULL AUTO_INCREMENT,
    airport_Name varchar(255) NOT NULL,
    airport_Iata varchar(255) NOT NULL,
    airport_location varchar(255) NOT NULL,
    PRIMARY KEY (airport_ID)
);

-- 독립적인 테이블 생성
CREATE TABLE airplane (
    airplane_ID int NOT NULL AUTO_INCREMENT,
    airplane_Type varchar(255) NOT NULL,
    airplane_No varchar(255) NOT NULL,
    airplane_Seat int NOT NULL,
    PRIMARY KEY (airplane_ID)
);

-- 독립적인 테이블 생성
CREATE TABLE seat_class (
    seat_class_id int NOT NULL AUTO_INCREMENT,
    seat_class_name varchar(255) NOT NULL,
    seat_class_price int NOT NULL,
    PRIMARY KEY (seat_class_id)
);

-- 독립적인 테이블 생성
CREATE TABLE seat_type (
    seat_type_id int NOT NULL AUTO_INCREMENT,
    seat_type_name varchar(255) NOT NULL,
    seat_type_price int,
    PRIMARY KEY (seat_type_id)
);

-- flight 테이블 생성 (airplane, airport 테이블 참조)
CREATE TABLE flight (
    flight_ID int NOT NULL AUTO_INCREMENT,
    start_Time datetime NOT NULL,
    end_Time datetime NOT NULL,
    airplane_ID int NOT NULL,
    departure_airport_ID int NOT NULL,
    arrival_airport_ID int NOT NULL,
    flight_Price int NOT NULL,
    PRIMARY KEY (flight_ID),
    FOREIGN KEY (airplane_ID) REFERENCES airplane (airplane_ID),
    FOREIGN KEY (departure_airport_ID) REFERENCES airport (airport_ID),
    FOREIGN KEY (arrival_airport_ID) REFERENCES airport (airport_ID)
);

-- seat 테이블 생성 (flight, seat_class, seat_type 테이블 참조)
CREATE TABLE seat (
    seat_id int NOT NULL AUTO_INCREMENT,
    flight_ID int NOT NULL,
    seat_no varchar(255) NOT NULL,
    seat_type_id int NOT NULL,
    seat_class_id int NOT NULL,
    is_reserved boolean NOT NULL,
    PRIMARY KEY (seat_id),
    FOREIGN KEY (seat_type_id) REFERENCES seat_type (seat_type_id),
    FOREIGN KEY (seat_class_id) REFERENCES seat_class (seat_class_id),
    FOREIGN KEY (flight_ID) REFERENCES flight (flight_ID)
);

-- 독립적인 테이블 생성
CREATE TABLE password_reset (
    Reset_Code int NOT NULL AUTO_INCREMENT,
    reset_Token varchar(255) NOT NULL,
    token_Expiration varchar(255) NOT NULL,
    member_code int NOT NULL,
    PRIMARY KEY (Reset_Code),
    FOREIGN KEY (member_code) REFERENCES member (member_code)
);

-- family 테이블 생성 (member 테이블 참조)
CREATE TABLE family (
    family_user_id varchar(255) NOT NULL,
    member_code int NOT NULL,
    family_birth_date date,
    family_key int NOT NULL,
    family_relation varchar(255) NOT NULL,
    family_phone varchar(255) NOT NULL,
    family_name varchar(255) NOT NULL,
    image BLOB,
    PRIMARY KEY (family_user_id),
    FOREIGN KEY (member_code) REFERENCES member (member_code)
);


-- pet 테이블 생성 (member 테이블 참조)
CREATE TABLE pet (
    pet_id int NOT NULL AUTO_INCREMENT,
    member_code int NOT NULL,
    pet_Name varchar(255) NOT NULL,
    species varchar(255) NOT NULL,
    breed varchar(255) NOT NULL,
    image BLOB,
    PRIMARY KEY (pet_id),
    FOREIGN KEY (member_code) REFERENCES member (member_code)
);

-- coupon 테이블 생성 (member 테이블 참조)
CREATE TABLE coupon (
    coupon_id int NOT NULL AUTO_INCREMENT,
    member_code int NOT NULL,
    coupon_code varchar(255) NOT NULL,
    discount_amount int,
    discount_percentage int,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    valid_until date NOT NULL,
    is_possible boolean NOT NULL,
    PRIMARY KEY (coupon_id),
    FOREIGN KEY (member_code) REFERENCES member (member_code)
);

-- board 테이블 생성 (member 테이블 참조)
CREATE TABLE board (
    board_id int NOT NULL AUTO_INCREMENT,
    member_code int NOT NULL,
    title varchar(255) NOT NULL,
    content varchar(255),
    submission_date date NOT NULL,
    status varchar(255) NOT NULL,
    answer varchar(255),  -- 추가된 컬럼
    PRIMARY KEY (board_id),
    FOREIGN KEY (member_code) REFERENCES member (member_code)
);

-- reservation 테이블 생성 (member, flight, seat, coupon 테이블 참조)
CREATE TABLE reservation (
    Reservation_No varchar(255) NOT NULL,
    member_code int NOT NULL,
    flight_ID int NOT NULL,
    seat_id int NOT NULL,
    coupon_id int,
    baggage_amount int NOT NULL,
    extra_baggage_amount int NOT NULL,
    baggage_price int NOT NULL,
    reservation_Date date NOT NULL,
    reservation_total_price int NOT NULL,
    PRIMARY KEY (Reservation_No),
    FOREIGN KEY (member_code) REFERENCES member (member_code),
    FOREIGN KEY (flight_ID) REFERENCES flight (flight_ID),
    FOREIGN KEY (seat_id) REFERENCES seat (seat_id),
    FOREIGN KEY (coupon_id) REFERENCES coupon (coupon_id)
);

-- 권한(Authority) 테이블에 대한 더미 데이터
INSERT INTO authority (authority_name, authority_desc) VALUES
    ('ROLE_ADMIN', '관리자 계정'),
    ('ROLE_USER', '일반 유저');

-- 회원(Member) 테이블에 대한 더미 데이터
INSERT INTO member (member_code, member_id, member_password, member_email, member_name, member_gender, birth_date, member_phone) VALUES
    (20231115, 'admin', '$2a$10$Q6ryDWturyqyQ/3kQkkw5.rIJY8D/.uvFOwOyqhUtUlBNI/A2Lswm', 'admin@example.com', 'User One', 'Female', '1990-01-01', '010-1010-1010'),
    (20231116, 'user77', '$2a$10$Q6ryDWturyqyQ/3kQkkw5.rIJY8D/.uvFOwOyqhUtUlBNI/A2Lswm', 'wade@example.com', '웨이드', 'Male', '1998-03-28', '010-1111-1111'),
    (20231117, 'user2', '$2a$10$Q6ryDWturyqyQ/3kQkkw5.rIJY8D/.uvFOwOyqhUtUlBNI/A2Lswm', 'user2@example.com', 'User Two', 'Female', '1992-02-02', '010-2222-2222'),
    (20231118,'user3', '$2a$10$Q6ryDWturyqyQ/3kQkkw5.rIJY8D/.uvFOwOyqhUtUlBNI/A2Lswm', 'user3@example.com', 'User Three', 'Male', '1993-03-03', '010-3333-3333'),
    (20231119,'user4', '$2a$10$Q6ryDWturyqyQ/3kQkkw5.rIJY8D/.uvFOwOyqhUtUlBNI/A2Lswm', 'user4@example.com', 'User Four', 'Female', '1994-04-04', '010-4444-4444'),
    (20231120,'user5', '$2a$10$Q6ryDWturyqyQ/3kQkkw5.rIJY8D/.uvFOwOyqhUtUlBNI/A2Lswm', 'user5@example.com', 'User Five', 'Male', '1995-05-05', '010-5555-5555'),
    (20231121,'user6', '$2a$10$Q6ryDWturyqyQ/3kQkkw5.rIJY8D/.uvFOwOyqhUtUlBNI/A2Lswm', 'user6@example.com', 'User Six', 'Female', '1996-06-06', '010-6666-6666'),
    (20231122,'user7', '$2a$10$Q6ryDWturyqyQ/3kQkkw5.rIJY8D/.uvFOwOyqhUtUlBNI/A2Lswm', 'user7@example.com', 'User Seven', 'Male', '1997-07-07', '010-7777-7777'),
    (20231123,'user8', '$2a$10$Q6ryDWturyqyQ/3kQkkw5.rIJY8D/.uvFOwOyqhUtUlBNI/A2Lswm', 'user8@example.com', 'User Eight', 'Female', '1998-08-08', '010-8888-8888'),
    (20231124,'user9', '$2a$10$Q6ryDWturyqyQ/3kQkkw5.rIJY8D/.uvFOwOyqhUtUlBNI/A2Lswm', 'user9@example.com', 'User Nine', 'Male', '1999-09-09', '010-9999-9999'),
    (20231125,'user10', '$2a$10$Q6ryDWturyqyQ/3kQkkw5.rIJY8D/.uvFOwOyqhUtUlBNI/A2Lswm', 'user10@example.com', 'User Ten', 'Female', '2000-10-10', '010-1010-1010');

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
m.member_id = 'user77'
AND a.authority_name = 'ROLE_USER';

-- 공항(Airport) 테이블에 대한 더미 데이터
INSERT INTO airport (airport_Name, airport_Iata, airport_location) VALUES
    ('인천 국제공항', 'ICN', 'Incheon'),
    ('김포 국제공항', 'GMP', 'Seoul'),
    ('김해 국제공항', 'PUS', 'Busan'),
    ('제주 국제공항', 'CJU', 'Jeju'),
    ('대구 국제공항', 'TAE', 'Daegu'),
    ('청주 국제공항', 'CJJ', 'Cheongju'),
    ('무안 국제공항', 'MWX', 'Muan'),
    ('양양 국제공항', 'YNY', 'Yangyang'),
    ('광주 국제공항', 'KWJ', 'Gwangju'),
    ('울산 국제공항', 'USN', 'Ulsan');

-- 비행기(Airplane) 테이블에 대한 더미 데이터
INSERT INTO airplane (airplane_Type, airplane_No, airplane_Seat) VALUES
    ('Oeing 172', 'O172-1', 40),
    ('Airbus A380', 'A380-1', 50),
    ('Boeing 777', 'B777-1', 50),
    ('Airbus A350', 'A350-1', 60),
    ('Boeing 737', 'B737-1', 30),
    ('Airbus A320', 'A320-1', 50),
    ('Boeing 787', 'B787-1', 70),
    ('Airbus A330', 'A330-1', 80),
    ('Boeing 767', 'B767-1', 50),
    ('Airbus A220', 'A220-1', 60);

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
    ('2024-07-01 08:00:00', '2024-07-01 10:00:00', 1, 1, 2, 150000),
    ('2024-07-01 11:00:00', '2024-07-01 13:00:00', 2, 2, 3, 200000),
    ('2024-07-01 14:00:00', '2024-07-01 16:00:00', 3, 3, 4, 180000),
    ('2024-07-01 17:00:00', '2024-07-01 19:00:00', 4, 4, 5, 220000),
    ('2024-07-01 20:00:00', '2024-07-01 22:00:00', 5, 5, 6, 250000),
    ('2024-07-02 08:00:00', '2024-07-02 10:00:00', 6, 6, 7, 150000),
    ('2024-07-02 11:00:00', '2024-07-02 13:00:00', 7, 7, 8, 200000),
    ('2024-07-02 14:00:00', '2024-07-02 16:00:00', 8, 8, 9, 180000),
    ('2024-07-02 17:00:00', '2024-07-02 19:00:00', 9, 9, 10, 220000),
    ('2024-07-02 20:00:00', '2024-07-02 22:00:00', 10, 10, 1, 250000),
    ('2024-07-02 21:00:00', '2024-07-02 23:50:00', 10, 10, 1, 250000),
    ('2024-07-01 08:00:00', '2024-07-01 10:00:00', 1, 1, 2, 150000),
    ('2024-07-01 11:00:00', '2024-07-01 13:00:00', 2, 2, 3, 200000),
    ('2024-07-01 14:00:00', '2024-07-01 16:00:00', 3, 3, 4, 180000),
    ('2024-07-01 17:00:00', '2024-07-01 19:00:00', 4, 4, 5, 220000),
    ('2024-07-01 20:00:00', '2024-07-01 22:00:00', 5, 5, 6, 250000),
    ('2024-07-02 08:00:00', '2024-07-02 10:00:00', 6, 6, 7, 150000),
    ('2024-07-02 11:00:00', '2024-07-02 13:00:00', 7, 7, 8, 200000),
    ('2024-07-02 14:00:00', '2024-07-02 16:00:00', 8, 8, 9, 180000),
    ('2024-07-02 17:00:00', '2024-07-02 19:00:00', 9, 9, 10, 220000),
    ('2024-07-02 20:00:00', '2024-07-02 22:00:00', 10, 10, 1, 250000),
    ('2024-07-02 21:00:00', '2024-07-02 23:50:00', 10, 10, 1, 250000);

-- 좌석(Seat) 테이블에 대한 더미 데이터
INSERT INTO seat (flight_ID, seat_no, seat_type_id, seat_class_id, is_reserved) VALUES

	-- 1번 항공편
    (1, 'A1', 1, 1, 0), (1, 'A2', 4, 1, 0), (1, 'A3', 4, 1, 0), (1, 'A4', 1, 1, 0),
    (1, 'B1', 1, 2, 0), (1, 'B2', 4, 2, 0), (1, 'B3', 4, 2, 0), (1, 'B4', 1, 2, 0),
    (1, 'C1', 1, 2, 0), (1, 'C2', 4, 2, 0), (1, 'C3', 4, 2, 0), (1, 'C4', 1, 2, 0),
    (1, 'D1', 1, 3, 0), (1, 'D2', 4, 3, 0), (1, 'D3', 4, 3, 0), (1, 'D4', 1, 3, 0),
    (1, 'E1', 1, 3, 0), (1, 'E2', 4, 3, 0), (1, 'E3', 4, 3, 0), (1, 'E4', 1, 3, 0),
    (1, 'F1', 1, 3, 0), (1, 'F2', 4, 3, 0), (1, 'F3', 4, 3, 0), (1, 'F4', 1, 3, 0),
    (1, 'G1', 3, 3, 0), (1, 'G2', 3, 3, 0), (1, 'G3', 3, 3, 0), (1, 'G4', 3, 3, 0),
    (1, 'H1', 1, 3, 0), (1, 'H2', 4, 3, 0), (1, 'H3', 4, 3, 0), (1, 'H4', 1, 3, 0),
    (1, 'I1', 2, 3, 0), (1, 'I2', 4, 3, 0), (1, 'I3', 2, 3, 0), (1, 'I4', 1, 3, 0),
    (1, 'J1', 2, 3, 0), (1, 'J2', 4, 3, 0), (1, 'J3', 4, 3, 0), (1, 'J4', 1, 3, 0),
    
    -- 2번 항공편
    (2, 'A1', 1, 1, 0), (2, 'A2', 4, 1, 0), (2, 'A3', 4, 1, 0), (2, 'A4', 1, 1, 0),
    (2, 'B1', 1, 2, 0), (2, 'B2', 4, 2, 0), (2, 'B3', 4, 2, 0), (2, 'B4', 1, 2, 0),
    (2, 'C1', 1, 2, 0), (2, 'C2', 4, 2, 0), (2, 'C3', 4, 2, 0), (2, 'C4', 1, 2, 0),
    (2, 'D1', 1, 3, 0), (2, 'D2', 4, 3, 0), (2, 'D3', 4, 3, 0), (2, 'D4', 1, 3, 0),
    (2, 'E1', 1, 3, 0), (2, 'E2', 4, 3, 0), (2, 'E3', 4, 3, 0), (2, 'E4', 1, 3, 0),
    (2, 'F1', 1, 3, 0), (2, 'F2', 4, 3, 0), (2, 'F3', 4, 3, 0), (2, 'F4', 1, 3, 0),
    (2, 'G1', 3, 3, 0), (2, 'G2', 3, 3, 0), (2, 'G3', 3, 3, 0), (2, 'G4', 3, 3, 0),
    (2, 'H1', 1, 3, 0), (2, 'H2', 4, 3, 0), (2, 'H3', 4, 3, 0), (2, 'H4', 1, 3, 0),
    (2, 'I1', 2, 3, 0), (2, 'I2', 4, 3, 0), (2, 'I3', 2, 3, 0), (2, 'I4', 1, 3, 0),
    (2, 'J1', 2, 3, 0), (2, 'J2', 4, 3, 0), (2, 'J3', 4, 3, 0), (2, 'J4', 1, 3, 0),
    (2, 'K1', 2, 3, 0), (2, 'K2', 4, 3, 0), (2, 'K3', 2, 3, 0), (2, 'K4', 1, 3, 0),
    (2, 'L1', 2, 3, 0), (2, 'L2', 4, 3, 0), (2, 'L3', 4, 3, 0), (2, 'L4', 1, 3, 0),
    (2, 'M1', 2, 3, 0), (2, 'M2', 4, 3, 0),
    
    -- 3번 항공편
    (3, 'A1', 1, 1, 0), (3, 'A2', 4, 1, 0), (3, 'A3', 4, 1, 0), (3, 'A4', 1, 1, 0),
    (3, 'B1', 1, 2, 0), (3, 'B2', 4, 2, 0), (3, 'B3', 4, 2, 0), (3, 'B4', 1, 2, 0),
    (3, 'C1', 1, 2, 0), (3, 'C2', 4, 2, 0), (3, 'C3', 4, 2, 0), (3, 'C4', 1, 2, 0),
    (3, 'D1', 1, 3, 0), (3, 'D2', 4, 3, 0), (3, 'D3', 4, 3, 0), (3, 'D4', 1, 3, 0),
    (3, 'E1', 1, 3, 0), (3, 'E2', 4, 3, 0), (3, 'E3', 4, 3, 0), (3, 'E4', 1, 3, 0),
    (3, 'F1', 1, 3, 0), (3, 'F2', 4, 3, 0), (3, 'F3', 4, 3, 0), (3, 'F4', 1, 3, 0),
    (3, 'G1', 3, 3, 0), (3, 'G2', 3, 3, 0), (3, 'G3', 3, 3, 0), (3, 'G4', 3, 3, 0),
    (3, 'H1', 1, 3, 0), (3, 'H2', 4, 3, 0), (3, 'H3', 4, 3, 0), (3, 'H4', 1, 3, 0),
    (3, 'I1', 2, 3, 0), (3, 'I2', 4, 3, 0), (3, 'I3', 2, 3, 0), (3, 'I4', 1, 3, 0),
    (3, 'J1', 2, 3, 0), (3, 'J2', 4, 3, 0), (3, 'J3', 4, 3, 0), (3, 'J4', 1, 3, 0),
    (3, 'K1', 2, 3, 0), (3, 'K2', 4, 3, 0), (3, 'K3', 2, 3, 0), (3, 'K4', 1, 3, 0),
    (3, 'L1', 2, 3, 0), (3, 'L2', 4, 3, 0), (3, 'L3', 4, 3, 0), (3, 'L4', 1, 3, 0),
    (3, 'M1', 2, 3, 0), (3, 'M2', 4, 3, 0),
    
    -- 4번 항공편
	(4, 'A1', 1, 1, 0), (4, 'A2', 4, 1, 0), (4, 'A3', 4, 1, 0), (4, 'A4', 1, 1, 0),
	(4, 'B1', 1, 2, 0), (4, 'B2', 4, 2, 0), (4, 'B3', 4, 2, 0), (4, 'B4', 1, 2, 0),
	(4, 'C1', 1, 2, 0), (4, 'C2', 4, 2, 0), (4, 'C3', 4, 2, 0), (4, 'C4', 1, 2, 0),
	(4, 'D1', 1, 3, 0), (4, 'D2', 4, 3, 0), (4, 'D3', 4, 3, 0), (4, 'D4', 1, 3, 0),
	(4, 'E1', 1, 3, 0), (4, 'E2', 4, 3, 0), (4, 'E3', 4, 3, 0), (4, 'E4', 1, 3, 0),
	(4, 'F1', 1, 3, 0), (4, 'F2', 4, 3, 0), (4, 'F3', 4, 3, 0), (4, 'F4', 1, 3, 0),
	(4, 'G1', 3, 3, 0), (4, 'G2', 3, 3, 0), (4, 'G3', 3, 3, 0), (4, 'G4', 3, 3, 0),
	(4, 'H1', 1, 3, 0), (4, 'H2', 4, 3, 0), (4, 'H3', 4, 3, 0), (4, 'H4', 1, 3, 0),
	(4, 'I1', 2, 3, 0), (4, 'I2', 4, 3, 0), (4, 'I3', 2, 3, 0), (4, 'I4', 1, 3, 0),
	(4, 'J1', 2, 3, 0), (4, 'J2', 4, 3, 0), (4, 'J3', 4, 3, 0), (4, 'J4', 1, 3, 0),
	(4, 'K1', 2, 3, 0), (4, 'K2', 4, 3, 0), (4, 'K3', 2, 3, 0), (4, 'K4', 1, 3, 0),
	(4, 'L1', 2, 3, 0), (4, 'L2', 4, 3, 0), (4, 'L3', 4, 3, 0), (4, 'L4', 1, 3, 0),
	(4, 'M1', 2, 3, 0), (4, 'M2', 4, 3, 0), (4, 'M3', 4, 3, 0), (4, 'M4', 1, 3, 0),
	(4, 'N1', 2, 3, 0), (4, 'N2', 4, 3, 0), (4, 'N3', 4, 3, 0), (4, 'N4', 1, 3, 0),
	(4, 'O1', 2, 3, 0), (4, 'O2', 4, 3, 0), (4, 'O3', 4, 3, 0), (4, 'O4', 1, 3, 0),
    
    -- 5번 항공편
	(5, 'A1', 1, 1, 0), (5, 'A2', 4, 1, 0), (5, 'A3', 4, 1, 0), (5, 'A4', 1, 1, 0),
	(5, 'B1', 1, 2, 0), (5, 'B2', 4, 2, 0), (5, 'B3', 4, 2, 0), (5, 'B4', 1, 2, 0),
	(5, 'C1', 1, 2, 0), (5, 'C2', 4, 2, 0), (5, 'C3', 4, 2, 0), (5, 'C4', 1, 2, 0),
	(5, 'D1', 1, 3, 0), (5, 'D2', 4, 3, 0), (5, 'D3', 4, 3, 0), (5, 'D4', 1, 3, 0),
	(5, 'E1', 1, 3, 0), (5, 'E2', 4, 3, 0), (5, 'E3', 4, 3, 0), (5, 'E4', 1, 3, 0),
	(5, 'F1', 1, 3, 0), (5, 'F2', 4, 3, 0), (5, 'F3', 4, 3, 0), (5, 'F4', 1, 3, 0),
	(5, 'G1', 3, 3, 0), (5, 'G2', 3, 3, 0), (5, 'G3', 3, 3, 0), (5, 'G4', 3, 3, 0),
	(5, 'H1', 1, 3, 0), (5, 'H2', 4, 3, 0),
    
    -- 6번 항공편
	(6, 'A1', 1, 1, 0), (6, 'A2', 4, 1, 0), (6, 'A3', 4, 1, 0), (6, 'A4', 1, 1, 0),
	(6, 'B1', 1, 2, 0), (6, 'B2', 4, 2, 0), (6, 'B3', 4, 2, 0), (6, 'B4', 1, 2, 0),
	(6, 'C1', 1, 2, 0), (6, 'C2', 4, 2, 0), (6, 'C3', 4, 2, 0), (6, 'C4', 1, 2, 0),
	(6, 'D1', 1, 3, 0), (6, 'D2', 4, 3, 0), (6, 'D3', 4, 3, 0), (6, 'D4', 1, 3, 0),
	(6, 'E1', 1, 3, 0), (6, 'E2', 4, 3, 0), (6, 'E3', 4, 3, 0), (6, 'E4', 1, 3, 0),
	(6, 'F1', 1, 3, 0), (6, 'F2', 4, 3, 0), (6, 'F3', 4, 3, 0), (6, 'F4', 1, 3, 0),
	(6, 'G1', 3, 3, 0), (6, 'G2', 3, 3, 0), (6, 'G3', 3, 3, 0), (6, 'G4', 3, 3, 0),
	(6, 'H1', 1, 3, 0), (6, 'H2', 4, 3, 0), (6, 'H3', 4, 3, 0), (6, 'H4', 1, 3, 0),
	(6, 'I1', 2, 3, 0), (6, 'I2', 4, 3, 0), (6, 'I3', 2, 3, 0), (6, 'I4', 1, 3, 0),
	(6, 'J1', 2, 3, 0), (6, 'J2', 4, 3, 0), (6, 'J3', 4, 3, 0), (6, 'J4', 1, 3, 0),
	(6, 'K1', 2, 3, 0), (6, 'K2', 4, 3, 0), (6, 'K3', 2, 3, 0), (6, 'K4', 1, 3, 0),
	(6, 'L1', 2, 3, 0), (6, 'L2', 4, 3, 0), (6, 'L3', 4, 3, 0), (6, 'L4', 1, 3, 0),
	(6, 'M1', 2, 3, 0), (6, 'M2', 4, 3, 0),
    
    -- 7번 항공편
	(7, 'A1', 1, 1, 0), (7, 'A2', 4, 1, 0), (7, 'A3', 4, 1, 0), (7, 'A4', 1, 1, 0),
	(7, 'B1', 1, 2, 0), (7, 'B2', 4, 2, 0), (7, 'B3', 4, 2, 0), (7, 'B4', 1, 2, 0),
	(7, 'C1', 1, 2, 0), (7, 'C2', 4, 2, 0), (7, 'C3', 4, 2, 0), (7, 'C4', 1, 2, 0),
	(7, 'D1', 1, 3, 0), (7, 'D2', 4, 3, 0), (7, 'D3', 4, 3, 0), (7, 'D4', 1, 3, 0),
	(7, 'E1', 1, 3, 0), (7, 'E2', 4, 3, 0), (7, 'E3', 4, 3, 0), (7, 'E4', 1, 3, 0),
	(7, 'F1', 1, 3, 0), (7, 'F2', 4, 3, 0), (7, 'F3', 4, 3, 0), (7, 'F4', 1, 3, 0),
	(7, 'G1', 3, 3, 0), (7, 'G2', 3, 3, 0), (7, 'G3', 3, 3, 0), (7, 'G4', 3, 3, 0),
	(7, 'H1', 1, 3, 0), (7, 'H2', 4, 3, 0), (7, 'H3', 4, 3, 0), (7, 'H4', 1, 3, 0),
	(7, 'I1', 2, 3, 0), (7, 'I2', 4, 3, 0), (7, 'I3', 2, 3, 0), (7, 'I4', 1, 3, 0),
	(7, 'J1', 2, 3, 0), (7, 'J2', 4, 3, 0), (7, 'J3', 4, 3, 0), (7, 'J4', 1, 3, 0),
	(7, 'K1', 2, 3, 0), (7, 'K2', 4, 3, 0), (7, 'K3', 2, 3, 0), (7, 'K4', 1, 3, 0),
	(7, 'L1', 2, 3, 0), (7, 'L2', 4, 3, 0), (7, 'L3', 4, 3, 0), (7, 'L4', 1, 3, 0),
	(7, 'M1', 2, 3, 0), (7, 'M2', 4, 3, 0), (7, 'M3', 4, 3, 0), (7, 'M4', 1, 3, 0),
	(7, 'N1', 2, 3, 0), (7, 'N2', 4, 3, 0), (7, 'N3', 4, 3, 0), (7, 'N4', 1, 3, 0),
	(7, 'O1', 2, 3, 0), (7, 'O2', 4, 3, 0), (7, 'O3', 4, 3, 0), (7, 'O4', 1, 3, 0),
	(7, 'P1', 2, 3, 0), (7, 'P2', 4, 3, 0), (7, 'P3', 4, 3, 0), (7, 'P4', 1, 3, 0),
	(7, 'Q1', 2, 3, 0), (7, 'Q2', 4, 3, 0), (7, 'Q3', 4, 3, 0), (7, 'Q4', 1, 3, 0),
	(7, 'R1', 2, 3, 0), (7, 'R2', 4, 3, 0),
    
    -- 8번 항공편
	(8, 'A1', 1, 1, 0), (8, 'A2', 4, 1, 0), (8, 'A3', 4, 1, 0), (8, 'A4', 1, 1, 0),
	(8, 'B1', 1, 2, 0), (8, 'B2', 4, 2, 0), (8, 'B3', 4, 2, 0), (8, 'B4', 1, 2, 0),
	(8, 'C1', 1, 2, 0), (8, 'C2', 4, 2, 0), (8, 'C3', 4, 2, 0), (8, 'C4', 1, 2, 0),
	(8, 'D1', 1, 3, 0), (8, 'D2', 4, 3, 0), (8, 'D3', 4, 3, 0), (8, 'D4', 1, 3, 0),
	(8, 'E1', 1, 3, 0), (8, 'E2', 4, 3, 0), (8, 'E3', 4, 3, 0), (8, 'E4', 1, 3, 0),
	(8, 'F1', 1, 3, 0), (8, 'F2', 4, 3, 0), (8, 'F3', 4, 3, 0), (8, 'F4', 1, 3, 0),
	(8, 'G1', 3, 3, 0), (8, 'G2', 3, 3, 0), (8, 'G3', 3, 3, 0), (8, 'G4', 3, 3, 0),
	(8, 'H1', 1, 3, 0), (8, 'H2', 4, 3, 0), (8, 'H3', 4, 3, 0), (8, 'H4', 1, 3, 0),
	(8, 'I1', 2, 3, 0), (8, 'I2', 4, 3, 0), (8, 'I3', 2, 3, 0), (8, 'I4', 1, 3, 0),
	(8, 'J1', 2, 3, 0), (8, 'J2', 4, 3, 0), (8, 'J3', 4, 3, 0), (8, 'J4', 1, 3, 0),
	(8, 'K1', 2, 3, 0), (8, 'K2', 4, 3, 0), (8, 'K3', 2, 3, 0), (8, 'K4', 1, 3, 0),
	(8, 'L1', 2, 3, 0), (8, 'L2', 4, 3, 0), (8, 'L3', 4, 3, 0), (8, 'L4', 1, 3, 0),
	(8, 'M1', 2, 3, 0), (8, 'M2', 4, 3, 0), (8, 'M3', 4, 3, 0), (8, 'M4', 1, 3, 0),
	(8, 'N1', 2, 3, 0), (8, 'N2', 4, 3, 0), (8, 'N3', 4, 3, 0), (8, 'N4', 1, 3, 0),
	(8, 'O1', 2, 3, 0), (8, 'O2', 4, 3, 0), (8, 'O3', 4, 3, 0), (8, 'O4', 1, 3, 0),
	(8, 'P1', 2, 3, 0), (8, 'P2', 4, 3, 0), (8, 'P3', 4, 3, 0), (8, 'P4', 1, 3, 0),
	(8, 'Q1', 2, 3, 0), (8, 'Q2', 4, 3, 0), (8, 'Q3', 4, 3, 0), (8, 'Q4', 1, 3, 0),
	(8, 'R1', 2, 3, 0), (8, 'R2', 4, 3, 0), (8, 'R3', 4, 3, 0), (8, 'R4', 1, 3, 0),
	(8, 'S1', 2, 3, 0), (8, 'S2', 4, 3, 0), (8, 'S3', 4, 3, 0), (8, 'S4', 1, 3, 0),
	(8, 'T1', 2, 3, 0), (8, 'T2', 4, 3, 0), (8, 'T3', 4, 3, 0), (8, 'T4', 1, 3, 0),
    
    -- 9번 항공편
	(9, 'A1', 1, 1, 0), (9, 'A2', 4, 1, 0), (9, 'A3', 4, 1, 0), (9, 'A4', 1, 1, 0),
	(9, 'B1', 1, 2, 0), (9, 'B2', 4, 2, 0), (9, 'B3', 4, 2, 0), (9, 'B4', 1, 2, 0),
	(9, 'C1', 1, 2, 0), (9, 'C2', 4, 2, 0), (9, 'C3', 4, 2, 0), (9, 'C4', 1, 2, 0),
	(9, 'D1', 1, 3, 0), (9, 'D2', 4, 3, 0), (9, 'D3', 4, 3, 0), (9, 'D4', 1, 3, 0),
	(9, 'E1', 1, 3, 0), (9, 'E2', 4, 3, 0), (9, 'E3', 4, 3, 0), (9, 'E4', 1, 3, 0),
	(9, 'F1', 1, 3, 0), (9, 'F2', 4, 3, 0), (9, 'F3', 4, 3, 0), (9, 'F4', 1, 3, 0),
	(9, 'G1', 3, 3, 0), (9, 'G2', 3, 3, 0), (9, 'G3', 3, 3, 0), (9, 'G4', 3, 3, 0),
	(9, 'H1', 1, 3, 0), (9, 'H2', 4, 3, 0), (9, 'H3', 4, 3, 0), (9, 'H4', 1, 3, 0),
	(9, 'I1', 2, 3, 0), (9, 'I2', 4, 3, 0), (9, 'I3', 2, 3, 0), (9, 'I4', 1, 3, 0),
	(9, 'J1', 2, 3, 0), (9, 'J2', 4, 3, 0), (9, 'J3', 4, 3, 0), (9, 'J4', 1, 3, 0),
	(9, 'K1', 2, 3, 0), (9, 'K2', 4, 3, 0), (9, 'K3', 2, 3, 0), (9, 'K4', 1, 3, 0),
	(9, 'L1', 2, 3, 0), (9, 'L2', 4, 3, 0), (9, 'L3', 4, 3, 0), (9, 'L4', 1, 3, 0),
	(9, 'M1', 2, 3, 0), (9, 'M2', 4, 3, 0),

	-- 10번 항공편
	(10, 'A1', 1, 1, 0), (10, 'A2', 4, 1, 0), (10, 'A3', 4, 1, 0), (10, 'A4', 1, 1, 0),
	(10, 'B1', 1, 2, 0), (10, 'B2', 4, 2, 0), (10, 'B3', 4, 2, 0), (10, 'B4', 1, 2, 0),
	(10, 'C1', 1, 2, 0), (10, 'C2', 4, 2, 0), (10, 'C3', 4, 2, 0), (10, 'C4', 1, 2, 0),
	(10, 'D1', 1, 3, 0), (10, 'D2', 4, 3, 0), (10, 'D3', 4, 3, 0), (10, 'D4', 1, 3, 0),
	(10, 'E1', 1, 3, 0), (10, 'E2', 4, 3, 0), (10, 'E3', 4, 3, 0), (10, 'E4', 1, 3, 0),
	(10, 'F1', 1, 3, 0), (10, 'F2', 4, 3, 0), (10, 'F3', 4, 3, 0), (10, 'F4', 1, 3, 0),
	(10, 'G1', 3, 3, 0), (10, 'G2', 3, 3, 0), (10, 'G3', 3, 3, 0), (10, 'G4', 3, 3, 0),
	(10, 'H1', 1, 3, 0), (10, 'H2', 4, 3, 0), (10, 'H3', 4, 3, 0), (10, 'H4', 1, 3, 0),
	(10, 'I1', 2, 3, 0), (10, 'I2', 4, 3, 0), (10, 'I3', 2, 3, 0), (10, 'I4', 1, 3, 0),
	(10, 'J1', 2, 3, 0), (10, 'J2', 4, 3, 0), (10, 'J3', 4, 3, 0), (10, 'J4', 1, 3, 0),
	(10, 'K1', 2, 3, 0), (10, 'K2', 4, 3, 0), (10, 'K3', 2, 3, 0), (10, 'K4', 1, 3, 0),
	(10, 'L1', 2, 3, 0), (10, 'L2', 4, 3, 0), (10, 'L3', 4, 3, 0), (10, 'L4', 1, 3, 0),
	(10, 'M1', 2, 3, 0), (10, 'M2', 4, 3, 0), (10, 'M3', 4, 3, 0), (10, 'M4', 1, 3, 0),
	(10, 'N1', 2, 3, 0), (10, 'N2', 4, 3, 0), (10, 'N3', 4, 3, 0), (10, 'N4', 1, 3, 0),
	(10, 'O1', 2, 3, 0), (10, 'O2', 4, 3, 0), (10, 'O3', 4, 3, 0), (10, 'O4', 1, 3, 0);


-- 비밀번호 재설정(Password_Reset) 테이블에 대한 더미 데이터
INSERT INTO password_reset (reset_Token, token_Expiration, member_code) VALUES
    ('token1', '2024-07-01 12:00:00', 20231116);

-- 가족(Family) 테이블에 대한 더미 데이터
INSERT INTO family (family_user_id, member_code, family_birth_date, family_key, family_relation, family_phone, family_name) VALUES
    ('fam1', 20231115, '2000-01-01', 1, 'Father', '010-1111-1111', 'Father One'),
    ('fam2', 20231116, '2002-02-02', 2, 'Mother', '010-2222-2222', 'Mother Two'),
    ('fam3', 20231117, '2003-03-03', 3, 'Brother', '010-3333-3333', 'Brother Three'),
    ('fam4', 20231118, '2004-04-04', 4, 'Sister', '010-4444-4444', 'Sister Four'),
    ('fam5', 20231119, '2005-05-05', 5, 'Son', '010-5555-5555', 'Son Five'),
    ('fam6', 20231120, '2006-06-06', 6, 'Daughter', '010-6666-6666', 'Daughter Six'),
    ('fam7', 20231121, '2007-07-07', 7, 'Uncle', '010-7777-7777', 'Uncle Seven'),
    ('fam8', 20231122, '2008-08-08', 8, 'Aunt', '010-8888-8888', 'Aunt Eight'),
    ('fam9', 20231123, '2009-09-09', 9, 'Cousin', '010-9999-9999', 'Cousin Nine'),
    ('fam10', 20231124, '2000-01-01', 10, 'Father', '010-1004-1004', 'Father Ten');

-- 애완동물(Pet) 테이블에 대한 더미 데이터
INSERT INTO pet (member_code, pet_Name, species, breed) VALUES
    (20231115, 'Apple', 'Dog', 'Golden Retriever'),
    (20231116, 'Buddy', 'Dog', 'Golden Retriever'),
    (20231117, 'Mittens', 'Cat', 'Siamese'),
    (20231118, 'Charlie', 'Dog', 'Beagle'),
    (20231119, 'Bella', 'Cat', 'Persian'),
    (20231120, 'Max', 'Dog', 'Bulldog'),
    (20231121, 'Luna', 'Cat', 'Maine Coon'),
    (20231122, 'Rocky', 'Dog', 'Poodle'),
    (20231123, 'Simba', 'Cat', 'Bengal'),
    (20231124, 'Buddy', 'Cat', 'Persian');

INSERT INTO coupon (member_code, coupon_code, discount_amount, discount_percentage, created_at, valid_until, is_possible) VALUES
    (20231115, 'DUMMYCODE1', 1000, NULL, NOW(), '2024-12-31', 1),
    (20231115, 'DUMMYCODE2', NULL, 10, NOW(), '2024-12-31', 0),
    (20231116, 'DUMMYCODE3', 500, NULL, NOW(), '2024-12-31', 1),
    (20231117, 'DUMMYCODE4', NULL, 5, NOW(), '2024-12-31', 1);



-- 게시판(Board) 테이블에 대한 더미 데이터
INSERT INTO board (member_code, title, content, submission_date, status, answer) VALUES
    (20231115, 'Title 1', 'Content 1', '2024-06-01', 'false', null),
    (20231116, 'Title 2', 'Content 2', '2024-06-02', 'false', null),
    (20231117, 'Title 3', 'Content 3', '2024-06-03', 'true', '이것도 질문이에요?'),
    (20231118, 'Title 4', 'Content 4', '2024-06-04', 'false', null),
    (20231119, 'Title 5', 'Content 5', '2024-06-05', 'true', '행복한 하루 보내세요.'),
    (20231120, 'Title 6', 'Content 6', '2024-06-06', 'false', null),
    (20231121, 'Title 7', 'Content 7', '2024-06-07', 'true', '이것도 질문이라고 남긴 당신, 정말 한심한 인간이네요.'),
    (20231122, 'Title 8', 'Content 8', '2024-06-08', 'false', null),
    (20231123, 'Title 9', 'Content 9', '2024-06-09', 'true', '당신 때문에 너무 힘들어요'),
    (20231124, 'Title 10', 'Content 10', '2024-06-09', 'true', '월급 받기 힘들다..');


