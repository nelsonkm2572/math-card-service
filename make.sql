DROP DATABASE IF EXISTS cards;
DROP USER IF EXISTS nelsonkm2572@localhost;

CREATE DATABASE cards CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER nelsonkm2572@localhost IDENTIFIED BY 'Basketball32!!';
GRANT ALL PRIVILEGES ON cards.* TO nelsonkm2572@localhost;
