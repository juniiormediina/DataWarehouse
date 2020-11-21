CREATE DATABASE `DataWarehouse`;


CREATE TABLE `DataWarehouse`.`users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `profile` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `DataWarehouse`.`contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `company` varchar(50) NOT NULL,
  `region` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `interest` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `DataWarehouse`.`companies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `DataWarehouse`.`region` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `DataWarehouse`.`country` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `RegionId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `RegionId` (`RegionId`),
  CONSTRAINT `country_ibfk_1` FOREIGN KEY (`RegionId`) REFERENCES `region` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `DataWarehouse`.`city` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(15) DEFAULT NULL,
  `CountryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `CountryId` (`CountryId`),
  CONSTRAINT `city_ibfk_1` FOREIGN KEY (`CountryId`) REFERENCES `country` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO `DataWarehouse`.`users`
    (`id`,
    `firstName`,
    `lastName`,
    `email`,
    `profile`,
    `password`)
VALUES
    ('1','Juan', 'Perez','juan@correo.com','administrator','$2a$10$RBXK42TYkTM.AwdCm6kRyOBfbGCosV/CLa374lFtZNafNdHabIjLW'),
    ('2','pedro', 'Perez','pedro@correo.com','contacts','$2a$10$KAA5o6wUz3MwZZg9.cbMRekss7H4DaEWmKUVYWLXfQ3CUUfWJfzri');


INSERT INTO `DataWarehouse`.`region` 
    (`id`,
    `name`)
VALUES 
    ('1','LATAM'),
    ('2','NORTEAMERICA');


INSERT INTO `DataWarehouse`.`country` 
    (`id`,
    `name`,
    `RegionId`)
VALUES 
    ('1','Colombia','1'),
    ('2','Estados Unidos','2');


INSERT INTO `DataWarehouse`.`city` 
    (`id`,
    `name`, 
    `CountryId`)
VALUES 
    ('1','Medellin', '1'),
    ('2','New York', '2');