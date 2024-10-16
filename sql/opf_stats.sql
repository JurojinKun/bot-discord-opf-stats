-- -------------------------------------------------------------
-- TablePlus 5.6.8(522)
--
-- https://tableplus.com/
--
-- Database: opf_stats
-- Generation Time: 2024-01-25 12:27:59.5430
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `accessories`;
CREATE TABLE `accessories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `characters`;
CREATE TABLE `characters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `unlockable` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=167 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `statistics_accessories`;
CREATE TABLE `statistics_accessories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `accessory_id` int DEFAULT NULL,
  `vie` int DEFAULT NULL,
  `endurance` int DEFAULT NULL,
  `attaque` int DEFAULT NULL,
  `defense` int DEFAULT NULL,
  `vitesse` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `accessory_id` (`accessory_id`),
  CONSTRAINT `statistics_accessories_ibfk_1` FOREIGN KEY (`accessory_id`) REFERENCES `accessories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `statistics_characters`;
CREATE TABLE `statistics_characters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `character_id` int DEFAULT NULL,
  `vie` int DEFAULT NULL,
  `endurance` int DEFAULT NULL,
  `attaque` int DEFAULT NULL,
  `defense` int DEFAULT NULL,
  `vitesse` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `character_id` (`character_id`),
  CONSTRAINT `statistics_characters_ibfk_1` FOREIGN KEY (`character_id`) REFERENCES `characters` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=130 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `statistics_weapons`;
CREATE TABLE `statistics_weapons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `weapon_id` int DEFAULT NULL,
  `vie` int DEFAULT NULL,
  `endurance` int DEFAULT NULL,
  `attaque` int DEFAULT NULL,
  `defense` int DEFAULT NULL,
  `vitesse` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `weapon_id` (`weapon_id`),
  CONSTRAINT `statistics_weapons_ibfk_1` FOREIGN KEY (`weapon_id`) REFERENCES `weapons` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `weapons`;
CREATE TABLE `weapons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `pets`;
CREATE TABLE `pets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `statistics_pets`;
CREATE TABLE `statistics_pets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pet_id` int DEFAULT NULL,
  `vie` int DEFAULT NULL,
  `endurance` int DEFAULT NULL,
  `attaque` int DEFAULT NULL,
  `defense` int DEFAULT NULL,
  `vitesse` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pet_id` (`pet_id`),
  CONSTRAINT `statistics_pets_ibfk_1` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `accessories` (`id`, `nom`) VALUES
(1, 'Boucles Zoro'),
(2, 'Tutu'),
(3, 'Boucles Boa'),
(4, 'Menottes'),
(5, 'Cigare'),
(6, 'Foulard'),
(7, 'Masque Sniperking'),
(8, 'Parchemin'),
(9, 'Escargophone'),
(10, 'Sac Plastique'),
(11, 'Parapluie'),
(12, 'Chapeau Saldeath'),
(13, 'Accessoires Ace');

INSERT INTO `characters` (`id`, `nom`, `unlockable`) VALUES
(1, 'Ace', 0),
(2, 'Bon Clay', 1),
(3, 'Crocodile', 1),
(4, 'Daz Bones', 0),
(5, 'Hina', 0),
(6, 'Koza', 0),
(7, 'Mr3', 0),
(8, 'Pell', 0),
(9, 'Vivi', 0),
(10, 'Wapol', 0),
(11, 'Hancock', 1),
(12, 'Margaret', 0),
(13, 'Marigold', 0),
(14, 'Sandersonia', 0),
(15, 'Kaido (Hybride)', 1),
(16, 'Luffy (Gear 4)', 1),
(17, 'Luffy (Gear 5)', 1),
(18, 'Nightmare Luffy', 1),
(19, 'Shiki', 1),
(20, 'Sogeking', 1),
(21, 'Bartolomeo', 1),
(22, 'Cavendish', 0),
(23, 'Corazon', 1),
(24, 'Dellinger', 0),
(25, 'Diamante', 1),
(26, 'Doflamingo', 1),
(27, 'Fujitora', 1),
(28, 'Gladius', 0),
(29, 'Kanjuro', 0),
(30, 'Kyros', 0),
(31, 'Pica', 1),
(32, 'Rebecca', 1),
(33, 'Sabo', 1),
(34, 'Senior Pink', 1),
(35, 'Sugar', 0),
(36, 'Trebol', 0),
(37, 'Viola', 0),
(38, 'Alvida', 0),
(39, 'Arlong', 0),
(40, 'Baggy', 1),
(41, 'Ben Beckman', 1),
(42, 'Dragon', 1),
(43, 'Koby', 1),
(44, 'Krieg', 0),
(45, 'Kuro', 1),
(46, 'Mihawk', 1),
(47, 'Roger', 1),
(48, 'Shanks', 1),
(49, 'Smoker', 1),
(50, 'Tashigi', 0),
(51, 'Zeff', 1),
(52, 'Jabura', 0),
(53, 'Kaku', 0),
(54, 'Kalifa', 0),
(55, 'Lucci', 1),
(56, 'Caribou', 0),
(57, 'Fisher Tiger', 1),
(58, 'Hody', 1),
(59, 'Neptune', 1),
(60, 'Shirahoshi', 1),
(61, 'Van Der Decken', 0),
(62, 'Hannyabal', 1),
(63, 'Inazuma', 0),
(64, 'Ivankov', 0),
(65, 'Magellan', 1),
(66, 'Shiryu', 1),
(67, 'Bellamy', 0),
(68, 'Burgess', 1),
(69, 'Foxy', 1),
(70, 'Teach', 1),
(71, 'Akainu', 0),
(72, 'Barbe Blanche', 1),
(73, 'Joz', 0),
(74, 'Marco', 1),
(75, 'Sengoku', 1),
(76, 'Vista', 0),
(77, 'Brook', 0),
(78, 'Chopper', 0),
(79, 'Franky', 0),
(80, 'Jinbei', 1),
(81, 'Luffy', 0),
(82, 'Nami', 0),
(83, 'Robin', 0),
(84, 'Sanji', 0),
(85, 'Usopp', 0),
(86, 'Zoro', 0),
(87, 'Cesar', 1),
(88, 'Kinemon', 0),
(89, 'Momonosuke', 1),
(90, 'Monet', 1),
(91, 'Vergo', 1),
(92, 'Bello Betty', 0),
(93, 'Karasu', 0),
(94, 'Koala', 0),
(95, 'Lindbergh', 0),
(96, 'Morley', 0),
(97, 'Apoo', 0),
(98, 'Bege', 0),
(99, 'Bepo', 0),
(100, 'Bonney', 0),
(101, 'Drake', 1),
(102, 'Hawkins', 0),
(103, 'Kid', 1),
(104, 'Killer', 0),
(105, 'Kizaru', 0),
(106, 'Kuma', 1),
(107, 'Law', 1),
(108, 'Rayleigh', 1),
(109, 'Sentomaru', 1),
(110, 'Urouge', 0),
(111, 'Ener', 1),
(112, 'Kalgara', 0),
(113, 'Norland', 1),
(114, 'Wiper', 0),
(115, 'Absalom', 0),
(116, 'Moria', 1),
(117, 'Perona', 0),
(118, 'Ryuma', 1),
(119, 'Big Mom', 1),
(120, 'Brulee', 0),
(121, 'Cracker', 1),
(122, 'Daifuku', 0),
(123, 'Flampe', 1),
(124, 'Ichiji', 0),
(125, 'Judge', 1),
(126, 'Katakuri', 1),
(127, 'Morgans', 1),
(128, 'Niji', 0),
(129, 'Oven', 0),
(130, 'Perospero', 1),
(131, 'Pudding', 0),
(132, 'Reiju', 1),
(133, 'Smoothie', 1),
(134, 'Tamago', 1),
(135, 'Yonji', 0),
(136, 'Ashura', 0),
(137, 'Black Maria', 0),
(138, 'Denjiro', 0),
(139, 'Hyogoro', 1),
(140, 'Izo', 0),
(141, 'Jack', 1),
(142, 'Kaido', 1),
(143, 'Kawamatsu', 0),
(144, 'Kikunojo', 0),
(145, 'King', 1),
(146, 'O-Tama', 0),
(147, 'Oden', 1),
(148, 'Orochi', 1),
(149, 'Page One', 0),
(150, 'Queen', 1),
(151, 'Sasaki', 0),
(152, 'Shinobu', 0),
(153, 'Ulti', 0),
(154, 'Whos Who', 0),
(155, 'Yamato', 1),
(156, 'Yasuie', 1),
(157, 'Aokiji', 0),
(158, 'Garp', 0),
(159, 'Pauly', 1),
(160, 'Carrot', 1),
(161, 'Inuarashi', 1),
(162, 'Nekomamushi', 1),
(163, 'Pedro', 1),
(164, 'Pekoms', 0),
(165, 'Raizo', 0),
(166, 'Gaimon', 1);

INSERT INTO `statistics_accessories` (`id`, `accessory_id`, `vie`, `endurance`, `attaque`, `defense`, `vitesse`) VALUES
(1, 1, 3, 10, 2, 0, 5);

INSERT INTO `statistics_characters` (`id`, `character_id`, `vie`, `endurance`, `attaque`, `defense`, `vitesse`) VALUES
(1, 138, 26, 21, 18, 25, 19),
(2, 61, 30, 24, 19, 35, 29),
(3, 81, 32, 23, 19, 32, 16),
(4, 86, 19, 17, 29, 15, 26),
(5, 54, 23, 31, 18, 25, 21),
(6, 11, 24, 23, 24, 19, 28),
(7, 114, 35, 23, 26, 22, 17),
(8, 78, 30, 20, 30, 22, 32),
(9, 67, 22, 28, 34, 22, 17),
(10, 53, 35, 15, 28, 34, 16),
(11, 154, 32, 26, 35, 32, 35),
(12, 79, 35, 20, 19, 21, 25),
(13, 96, 25, 15, 18, 27, 24),
(14, 102, 28, 35, 22, 19, 23),
(15, 84, 35, 23, 22, 31, 21),
(16, 109, 30, 31, 22, 35, 32),
(17, 129, 33, 28, 22, 34, 16),
(18, 57, 29, 33, 35, 23, 24),
(19, 123, 19, 18, 26, 33, 27),
(20, 137, 23, 35, 17, 17, 35),
(21, 122, 29, 17, 30, 23, 32),
(22, 110, 15, 17, 33, 25, 24),
(23, 144, 34, 30, 34, 21, 35),
(24, 140, 20, 21, 24, 28, 32),
(25, 105, 26, 23, 31, 16, 30),
(26, 63, 31, 23, 17, 24, 21),
(27, 165, 18, 20, 18, 22, 34),
(28, 115, 35, 30, 16, 31, 28),
(29, 52, 27, 23, 30, 20, 35),
(30, 65, 22, 31, 29, 23, 24),
(31, 39, 34, 35, 32, 24, 35),
(32, 64, 28, 25, 19, 35, 31),
(33, 44, 15, 22, 29, 20, 19),
(34, 6, 16, 24, 15, 23, 32),
(35, 97, 27, 24, 31, 33, 21),
(36, 99, 15, 22, 17, 32, 17),
(37, 101, 20, 22, 33, 33, 27),
(38, 98, 18, 33, 33, 30, 20),
(39, 112, 24, 23, 15, 16, 30),
(40, 77, 22, 21, 27, 25, 29),
(41, 36, 21, 27, 15, 31, 33),
(42, 35, 16, 21, 16, 28, 16),
(43, 88, 19, 32, 29, 23, 29),
(44, 13, 24, 31, 32, 15, 28),
(45, 28, 18, 15, 33, 34, 25),
(46, 155, 28, 29, 30, 35, 26),
(47, 125, 25, 26, 35, 26, 29),
(48, 147, 33, 34, 21, 30, 31),
(49, 106, 18, 26, 30, 22, 19),
(50, 59, 34, 21, 35, 26, 24),
(51, 8, 23, 26, 34, 15, 16),
(52, 74, 31, 20, 27, 30, 32),
(53, 56, 31, 22, 16, 19, 17),
(54, 10, 31, 19, 20, 15, 24),
(55, 40, 34, 33, 28, 33, 23),
(56, 22, 19, 23, 24, 15, 22),
(57, 135, 28, 27, 35, 15, 24),
(58, 130, 28, 20, 32, 21, 33),
(59, 164, 19, 17, 22, 26, 23),
(60, 136, 15, 24, 34, 17, 32),
(61, 29, 33, 28, 24, 28, 28),
(62, 21, 32, 29, 28, 27, 32),
(63, 128, 18, 21, 22, 29, 20),
(64, 73, 27, 19, 26, 23, 25),
(65, 38, 22, 21, 22, 23, 22),
(66, 95, 25, 16, 21, 18, 24),
(67, 24, 28, 24, 33, 24, 20),
(68, 14, 23, 32, 32, 19, 19),
(69, 34, 23, 21, 23, 26, 22),
(70, 151, 20, 24, 20, 35, 35),
(71, 134, 24, 35, 25, 27, 35),
(72, 127, 20, 20, 33, 30, 33),
(73, 19, 34, 34, 32, 32, 33),
(74, 47, 30, 34, 25, 26, 25),
(75, 124, 31, 21, 22, 32, 27),
(76, 116, 19, 35, 23, 29, 19),
(77, 131, 21, 26, 16, 15, 28),
(78, 153, 30, 17, 22, 28, 24),
(79, 152, 22, 29, 35, 18, 17),
(80, 20, 19, 23, 21, 25, 18),
(81, 71, 21, 17, 19, 27, 30),
(82, 70, 31, 29, 32, 32, 29),
(83, 104, 20, 33, 33, 18, 27),
(84, 50, 35, 15, 31, 35, 29),
(85, 5, 18, 25, 29, 23, 27),
(86, 18, 24, 33, 23, 28, 21),
(87, 100, 28, 16, 31, 19, 24),
(88, 103, 22, 33, 30, 35, 20),
(89, 146, 19, 29, 30, 21, 32),
(90, 82, 23, 29, 18, 28, 22),
(91, 30, 22, 18, 19, 20, 19),
(92, 117, 17, 33, 18, 33, 29),
(93, 159, 33, 30, 25, 25, 34),
(94, 51, 30, 23, 33, 28, 27),
(95, 139, 32, 31, 27, 18, 23),
(96, 93, 22, 35, 21, 17, 26),
(97, 148, 34, 23, 28, 35, 28),
(98, 158, 34, 32, 19, 23, 19),
(99, 2, 28, 25, 31, 31, 33),
(100, 113, 24, 31, 22, 30, 23),
(101, 69, 23, 26, 20, 26, 32),
(102, 143, 31, 35, 34, 33, 31),
(103, 60, 21, 23, 23, 24, 22),
(104, 12, 26, 24, 23, 30, 28),
(105, 41, 35, 33, 26, 24, 30),
(106, 9, 27, 24, 20, 35, 35),
(107, 1, 26, 18, 35, 27, 23),
(108, 87, 21, 23, 29, 33, 23),
(109, 94, 29, 21, 18, 32, 16),
(110, 4, 17, 24, 27, 34, 20),
(111, 92, 27, 22, 24, 22, 16),
(112, 83, 31, 20, 19, 33, 19),
(113, 120, 23, 17, 33, 34, 32),
(114, 37, 31, 21, 32, 17, 23),
(115, 68, 22, 26, 28, 28, 34),
(116, 62, 31, 22, 30, 19, 33),
(122, 132, 20, 22, 21, 22, 19),
(123, 85, 25, 27, 21, 16, 26),
(124, 7, 25, 28, 19, 26, 19),
(125, 149, 28, 20, 34, 22, 17),
(127, 76, 32, 20, 19, 32, 26),
(128, 31, 26, 33, 30, 29, 34),
(129, 157, 25, 20, 29, 18, 30);

INSERT INTO `statistics_weapons` (`id`, `weapon_id`, `vie`, `endurance`, `attaque`, `defense`, `vitesse`) VALUES
(1, 1, 0, 0, 20, 0, 15),
(2, 2, 0, 0, 13, 0, 22),
(3, 3, 0, 0, 0, 18, 14);

INSERT INTO `weapons` (`id`, `nom`) VALUES
(1, 'Kitetsu'),
(2, 'Durandal'),
(3, 'Climatackt'),
(4, 'Punisher'),
(5, 'Yubashiri'),
(6, 'Bazooka'),
(7, 'Minigun'),
(8, 'Kiribashi'),
(9, 'Fusil'),
(10, 'Dial'),
(11, 'Jitte'),
(12, 'Tuyau'),
(13, 'Soul Solid'),
(14, 'Kabuto'),
(15, 'Funkfreed'),pets
(16, 'Raiu'),
(17, 'Murakumogiri'),
(18, 'Warabide');

INSERT INTO `pets` (`id`, `nom`) VALUES
(1, 'Aerofish');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;