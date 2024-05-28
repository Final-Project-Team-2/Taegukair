-- CREATE DATABASE taegukair;

-- CREATE USER 'taegukair'@'%' IDENTIFIED BY  'taegukair';

-- GRANT ALL PRIVILEGES ON *.* TO 'taegukair'@'%' WITH GRANT OPTION;
-- GRANT ALL PRIVILEGES ON taegukair.* TO 'taegukair'@'%';
-- USE taegukair;
-- SHOW grants;
--  
-- SELECT user, host FROM mysql.user WHERE user = 'taegukair';

-- show databases;

-- 순서대로 테이블 삭제

-- DROP TABLE IF EXISTS reservation;
-- DROP TABLE IF EXISTS seat;
-- DROP TABLE IF EXISTS flight;
-- DROP TABLE IF EXISTS airplane;
-- DROP TABLE IF EXISTS airport;
-- DROP TABLE IF EXISTS pet;
-- DROP TABLE IF EXISTS family;
-- DROP TABLE IF EXISTS password_reset;
-- DROP TABLE IF EXISTS coupon;
-- DROP TABLE IF EXISTS board;
-- DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS permission;
-- DROP TABLE IF EXISTS seat_class;
-- DROP TABLE IF EXISTS seat_type;


-- 가장 독립적인 테이블 생성
CREATE TABLE permission (
    permission_Code int NOT NULL AUTO_INCREMENT,
    permission_Name varchar(255) NOT NULL,
    permission_Desc varchar(255) NOT NULL,
    PRIMARY KEY (permission_Code)
);

-- users 테이블 생성 (permission 테이블 참조)
CREATE TABLE users (
    user_ID varchar(255) NOT NULL,
    user_PW varchar(255) NOT NULL,
    user_Email varchar(255) NOT NULL,
    user_Key int NOT NULL,
    user_Name varchar(255) NOT NULL,
    user_Gender varchar(255) NOT NULL,
    birth_Date date NOT NULL,
    user_Phone varchar(255) NOT NULL,
    permission_Code int NOT NULL,
    PRIMARY KEY (user_ID),
    FOREIGN KEY (permission_Code) REFERENCES permission (permission_Code)
);

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
    seat_ID int NOT NULL AUTO_INCREMENT,
    seat_class_name varchar(255) NOT NULL,
    seat_class_price int NOT NULL,
    PRIMARY KEY (seat_ID)
);

-- 독립적인 테이블 생성
CREATE TABLE seat_type (
    seat_type_ID int NOT NULL AUTO_INCREMENT,
    seat_type_name varchar(255) NOT NULL,
    seat_type_price int,
    PRIMARY KEY (seat_type_ID)
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
    flight_ID int NOT NULL,
    seat_No varchar(255) NOT NULL,
    seat_type_ID int NOT NULL,
    seat_ID int NOT NULL,
    is_reserved boolean NOT NULL,
    PRIMARY KEY (flight_ID, seat_No),
    FOREIGN KEY (seat_type_ID) REFERENCES seat_type (seat_type_ID),
    FOREIGN KEY (seat_ID) REFERENCES seat_class (seat_ID),
    FOREIGN KEY (flight_ID) REFERENCES flight (flight_ID),
    INDEX (seat_No)
);

-- 독립적인 테이블 생성
CREATE TABLE password_reset (
    Reset_Code int NOT NULL AUTO_INCREMENT,
    reset_Token varchar(255) NOT NULL,
    token_Expiration varchar(255) NOT NULL,
    user_ID varchar(255) NOT NULL,
    PRIMARY KEY (Reset_Code),
    FOREIGN KEY (user_ID) REFERENCES users (user_ID)
);

-- family 테이블 생성 (users 테이블 참조)
CREATE TABLE family (
    family_user_id varchar(255) NOT NULL,
    user_ID varchar(255) NOT NULL,
    family_birth_date date,
    family_key int NOT NULL,
    family_relation varchar(255) NOT NULL,
    family_phone varchar(255) NOT NULL,
    family_name varchar(255) NOT NULL,
    image BLOB,
    PRIMARY KEY (family_user_id),
    FOREIGN KEY (user_ID) REFERENCES users (user_ID)
);


-- pet 테이블 생성 (users 테이블 참조)
CREATE TABLE pet (
    pet_id int NOT NULL AUTO_INCREMENT,
    user_ID varchar(255) NOT NULL,
    pet_Name varchar(255) NOT NULL,
    species varchar(255) NOT NULL,
    breed varchar(255) NOT NULL,
    image BLOB,
    PRIMARY KEY (pet_id),
    FOREIGN KEY (user_ID) REFERENCES users (user_ID)
);

-- coupon 테이블 생성 (users 테이블 참조)
CREATE TABLE coupon (
    coupon_id int NOT NULL AUTO_INCREMENT,
    user_ID varchar(255) NOT NULL,
    coupon_code varchar(255) NOT NULL,
    discount_amount int,
    discount_percentage int,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    valid_until date NOT NULL,
    is_possible boolean NOT NULL,
    PRIMARY KEY (coupon_id),
    FOREIGN KEY (user_ID) REFERENCES users (user_ID)
);

-- board 테이블 생성 (users 테이블 참조)
CREATE TABLE board (
   board_id int NOT NULL AUTO_INCREMENT,
   user_ID varchar(255) NOT NULL,
   title varchar(255) NOT NULL,
   content varchar(255),
   submission_date date NOT NULL,
   status varchar(255) NOT NULL,
   answer varchar(255),  -- 추가된 컬럼
   PRIMARY KEY (board_id),
   FOREIGN KEY (user_ID) REFERENCES users (user_ID)
);

-- reservation 테이블 생성 (users, flight, seat, coupon 테이블 참조)
CREATE TABLE reservation (
    Reservation_No varchar(255) NOT NULL,
    user_ID varchar(255) NOT NULL,
    flight_ID int NOT NULL,
    seat_No varchar(255) NOT NULL,
    coupon_id int,
    baggage_amount int NOT NULL,
    extra_baggage_amount int NOT NULL,
    baggage_price int NOT NULL,
    reservation_Date date NOT NULL,
    PRIMARY KEY (Reservation_No),
    FOREIGN KEY (user_ID) REFERENCES users (user_ID),
    FOREIGN KEY (flight_ID) REFERENCES flight (flight_ID),
    FOREIGN KEY (seat_No) REFERENCES seat (seat_No),
    FOREIGN KEY (coupon_id) REFERENCES coupon (coupon_id)
);







