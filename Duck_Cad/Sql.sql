CREATE DATABASE IF NOT EXISTS `essentialmode`;
USE `essentialmode`;

CREATE TABLE IF NOT EXISTS `duckcad_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `secondryid` int(11) NOT NULL,
  `steam` text NOT NULL,
  `reason` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `author` text NOT NULL,
  `deleted` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;

ALTER TABLE `owned_vehicles` ADD `WantedLevel` TEXT NULL DEFAULT 'standard';
ALTER TABLE `owned_vehicles` ADD `Profile_Pic` TEXT NULL DEFAULT 'https://media.discordapp.net/attachments/813604209462214676/858319794900959232/unknown.png?width=1201&height=676';

ALTER TABLE `users ` ADD `WantedLevel` TEXT NULL DEFAULT 'standard';
ALTER TABLE `users ` ADD `Profile_Pic` TEXT NULL DEFAULT 'https://media.discordapp.net/attachments/813604209462214676/858319794900959232/unknown.png?width=1201&height=676';
