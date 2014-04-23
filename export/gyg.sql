-- phpMyAdmin SQL Dump
-- version 4.0.9
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 23. Apr 2014 um 16:10
-- Server Version: 5.5.34
-- PHP-Version: 5.4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `gyg`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `bandcontacts`
--

DROP TABLE IF EXISTS `bandcontacts`;
CREATE TABLE IF NOT EXISTS `bandcontacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bandid` int(11) NOT NULL,
  `personid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- RELATIONEN DER TABELLE `bandcontacts`:
--   `bandid`
--       `bands` -> `id`
--   `personid`
--       `persons` -> `id`
--

--
-- Daten für Tabelle `bandcontacts`
--

INSERT INTO `bandcontacts` (`id`, `bandid`, `personid`) VALUES
(1, 1, 2);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `bandgigs`
--

DROP TABLE IF EXISTS `bandgigs`;
CREATE TABLE IF NOT EXISTS `bandgigs` (
  `bandid` int(11) NOT NULL,
  `gigid` int(11) NOT NULL,
  PRIMARY KEY (`bandid`,`gigid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONEN DER TABELLE `bandgigs`:
--   `bandid`
--       `bands` -> `id`
--   `gigid`
--       `gigs` -> `id`
--

--
-- Daten für Tabelle `bandgigs`
--

INSERT INTO `bandgigs` (`bandid`, `gigid`) VALUES
(1, 1),
(2, 1),
(2, 2),
(3, 1),
(3, 2),
(4, 2),
(5, 3),
(6, 3);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `bands`
--

DROP TABLE IF EXISTS `bands`;
CREATE TABLE IF NOT EXISTS `bands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Daten für Tabelle `bands`
--

INSERT INTO `bands` (`id`, `name`, `description`) VALUES
(1, 'steen', NULL),
(2, 'Rammstein', 'blaaaaa'),
(3, 'Sum 41', NULL),
(4, 'System of a Down', 'AWESOME!!!!'),
(5, 'Rogers', NULL),
(6, 'Broilers', NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `gigs`
--

DROP TABLE IF EXISTS `gigs`;
CREATE TABLE IF NOT EXISTS `gigs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gigdate` date NOT NULL,
  `getin` time DEFAULT NULL,
  `doors` time DEFAULT NULL,
  `begin` time NOT NULL DEFAULT '20:00:00',
  `venueid` int(11) NOT NULL,
  `slots` int(11) NOT NULL DEFAULT '3',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- RELATIONEN DER TABELLE `gigs`:
--   `venueid`
--       `venues` -> `id`
--

--
-- Daten für Tabelle `gigs`
--

INSERT INTO `gigs` (`id`, `gigdate`, `getin`, `doors`, `begin`, `venueid`, `slots`) VALUES
(1, '2014-10-22', NULL, NULL, '20:00:00', 1, 6),
(2, '2014-04-18', NULL, NULL, '20:00:00', 2, 3),
(3, '2014-06-05', '16:00:00', '19:00:00', '20:00:00', 3, 4);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `persons`
--

DROP TABLE IF EXISTS `persons`;
CREATE TABLE IF NOT EXISTS `persons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(200) DEFAULT NULL,
  `tel` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Daten für Tabelle `persons`
--

INSERT INTO `persons` (`id`, `firstname`, `lastname`, `email`, `tel`) VALUES
(1, 'Area', 'Ansprechpartner', 'blablabla@area51hilden.de', '01234 56789'),
(2, 'Heinz', 'Ketchup', 'heinz@ketchup.de', '012312 1231234243');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'auto incrementing user_id of each user, unique index',
  `user_name` varchar(64) COLLATE utf8_unicode_ci NOT NULL COMMENT 'user''s name, unique',
  `user_password_hash` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'user''s password in salted and hashed format',
  `user_email` varchar(64) COLLATE utf8_unicode_ci NOT NULL COMMENT 'user''s email, unique',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_name` (`user_name`),
  UNIQUE KEY `user_email` (`user_email`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='user data' AUTO_INCREMENT=3 ;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_password_hash`, `user_email`) VALUES
(2, 'steen', '$2y$10$cIPP/hKW3T2h8tBgKcooi.Nti0X9X8tFHo.UXwL2CHZcbNnHWKZMa', 'info@steenband.de');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `venuecontacts`
--

DROP TABLE IF EXISTS `venuecontacts`;
CREATE TABLE IF NOT EXISTS `venuecontacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `venueid` int(11) NOT NULL,
  `personid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- RELATIONEN DER TABELLE `venuecontacts`:
--   `personid`
--       `persons` -> `id`
--   `venueid`
--       `venues` -> `id`
--

--
-- Daten für Tabelle `venuecontacts`
--

INSERT INTO `venuecontacts` (`id`, `venueid`, `personid`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `venues`
--

DROP TABLE IF EXISTS `venues`;
CREATE TABLE IF NOT EXISTS `venues` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `street` varchar(150) NOT NULL,
  `number` varchar(10) NOT NULL,
  `zip` varchar(10) NOT NULL,
  `city` varchar(60) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Daten für Tabelle `venues`
--

INSERT INTO `venues` (`id`, `name`, `street`, `number`, `zip`, `city`) VALUES
(1, 'Area 51', 'Furtwäglerstr.', '2b', '40724', 'Hilden'),
(2, 'LTU Arena', 'LTU Arena Street', '1', '44444', 'Düsseldorf'),
(3, 'Club1', 'bla', 'bla', 'bla', 'bla');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
