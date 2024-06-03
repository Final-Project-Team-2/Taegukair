CREATE DATABASE taegukair;

CREATE USER 'taegukair'@'%' IDENTIFIED BY  'taegukair';

GRANT ALL PRIVILEGES ON *.* TO 'taegukair'@'%' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON taegukair.* TO 'taegukair'@'%';
USE taegukair;
SHOW grants;
  
SELECT user, host FROM mysql.user WHERE user = 'taegukair';

show databases;

-- 순서대로 테이블 삭제

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

show tables;

CREATE TABLE verification_code (
       id BIGINT AUTO_INCREMENT PRIMARY KEY,
       phone_number VARCHAR(255) NOT NULL,
       code VARCHAR(255) NOT NULL,
       created_at DATETIME NOT NULL,
       verified BOOLEAN NOT NULL
);


create table if not exists member
(
    -- column level constraints
    member_code int auto_increment comment '회원식별코드',
    member_id varchar(255) unique not null comment '아이디',
    member_name varchar(255) not null comment '회원이름',
    member_password varchar(255) not null comment '비밀번호',
    member_email varchar(255) not null comment '이메일',
    member_gender varchar(255) not null comment '성별',
    birth_date date NOT NULL,
    member_phone varchar(255) NOT NULL,
    -- table level constraints
    constraint pk_member_code primary key (member_code)
) engine=innodb comment '회원';


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