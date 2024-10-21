-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 21, 2024 at 11:57 AM
-- Server version: 8.0.39-cll-lve
-- PHP Version: 8.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `huludeig_inventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `Address`
--

CREATE TABLE `Address` (
  `id` int NOT NULL,
  `country` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Ethiopia',
  `city` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subCity` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `wereda` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Address`
--

INSERT INTO `Address` (`id`, `country`, `city`, `subCity`, `wereda`, `createdAt`) VALUES
(1, 'Ethiopia', 'Addis Ababa', 'Addis Ababa', 'kalit', '2024-09-06 17:37:37.716'),
(2, 'Ethiopia', 'Addis Ababa', 'Bole', 'kolfe', '2024-09-06 17:39:51.849'),
(3, 'Ethiopia', 'Addis Ababa', 'Bole', 'Ayer tena', '2024-09-06 17:45:16.640'),
(4, 'Ethiopia', 'Addis ababa', 'bole', 'kotebe 02', '2024-09-06 18:07:12.445'),
(5, 'Ethiopia', 'Addis ababa', 'koye', 'koye', '2024-09-06 20:00:51.769'),
(6, 'Ethiopia', 'Addis ababa', 'bole', 'haya arat', '2024-09-06 20:01:54.135'),
(7, 'Ethiopia', 'Addis ababa', 'lafto', 'zero sebat', '2024-09-06 20:02:37.756'),
(8, 'Ethiopia', 'Addis ababa', 'koye', 'zetena sebat', '2024-09-06 20:04:25.979'),
(9, 'Ethiopa', 'Arbaminch', 'arba', 'arba 90', '2024-09-06 20:07:39.595'),
(10, 'Ethiopa', 'Jimma', 'Kito', 'arba 90', '2024-09-06 20:08:20.551'),
(11, 'Ethiopa', 'Jimma', 'Kito', '90', '2024-09-06 20:08:37.916'),
(12, 'Ethiopia', 'Addis ababa', 'jimma', 'kenema ', '2024-09-06 20:09:05.303'),
(13, 'Ethiopia', 'Addis ababa', 'jimma', 'kenema ', '2024-09-16 08:48:06.758'),
(14, 'Ethiopia', 'Addis ababa', 'jimma', 'kenema ', '2024-09-16 14:15:15.518'),
(15, 'Ethiopia', 'Harar', 'Dire dawa', 'wereda', '2024-09-19 07:00:30.209'),
(16, 'Ethiopia', 'Harar', 'Dire Dawa', 'wereda 09', '2024-09-19 07:04:11.663'),
(17, 'Ethiopia', 'Addis Ababa', 'Addis Ababa', 'ethi 09', '2024-09-19 07:08:34.332'),
(18, 'Ethiopia', 'Addis Ababa', 'Addis Ababa', 'nmnj', '2024-09-19 07:10:42.067'),
(19, 'Ethiopia', 'Addis Ababa', 'Addis Ababa', 'wereda 32', '2024-09-19 07:15:44.278'),
(20, 'Ethiopia', 'Addis Ababa', 'Addis Ababa', 'wereda 09', '2024-09-19 07:25:27.379'),
(21, 'Ethiopia', 'dire dawa', 'dire dawa', 'dire 09', '2024-09-19 07:33:50.587'),
(22, 'Ethiopia', 'Addis Ababa', 'Addis Ababa', 'Dire dawa', '2024-09-19 07:41:34.721'),
(23, 'Ethiopia', 'Addis Ababa', 'Addis Ababa', 'dire 09', '2024-09-19 12:32:07.444'),
(24, 'Ethiopia', 'Addis Ababa', 'Bole', 'Bole 09', '2024-09-21 07:46:03.865'),
(25, 'Ethiopia', 'Addis Ababa', 'Kolfe', 'kolfe 01', '2024-09-21 07:46:58.383'),
(26, 'Ethiopia', 'Addis Ababa', 'Kirkos', 'kirkos 32', '2024-09-21 07:48:40.494'),
(27, 'Ethiopia', 'Addis Ababa', 'Goro', 'goro 21', '2024-09-21 07:52:02.232'),
(28, 'Ethiopia', 'Addis Ababa', 'Bole', 'Bole 02', '2024-09-21 07:53:33.399'),
(29, 'Ethiopia', 'Oromia', 'Ambo', 'ambo 02', '2024-09-21 07:54:57.264'),
(30, 'Ethiopia', 'Oromia', 'Bishofitu', 'bishofitu 04', '2024-09-21 07:55:46.893'),
(31, 'Ethiopia', 'Oromia', 'Butajira', 'butajira 04', '2024-09-21 07:56:10.851'),
(32, 'Ethiopia', 'South', 'Hoshana', 'hoshana 09', '2024-09-21 07:56:49.565'),
(33, 'Ethiopia', 'Oromia', 'Jimma', 'jimma 09', '2024-09-21 07:57:16.215'),
(34, 'Ethiopia', 'South', 'Metu', 'metu 08', '2024-09-21 07:57:54.886'),
(35, 'Ethiopia', 'South', 'Weliketa', 'weliketa 08', '2024-09-21 07:58:20.327'),
(36, 'Ethiopia', 'Addis Ababa', 'Addis Ababa', '09', '2024-09-23 02:31:17.940'),
(37, 'Ethiopia', 'Addis Ababa', 'Addis Ababa', 'wwwwww', '2024-09-23 08:56:24.997'),
(38, 'Ethiopia', 'Addis Ababa', 'Addis Ababa', 'tafo', '2024-09-24 08:06:26.814'),
(39, 'Ethiopia', 'Adis Ababa', 'Bole', '04', '2024-09-25 12:11:36.407');

-- --------------------------------------------------------

--
-- Table structure for table `Department`
--

CREATE TABLE `Department` (
  `id` int NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Department`
--

INSERT INTO `Department` (`id`, `name`, `createdAt`) VALUES
(1, 'Logestics', '2024-09-06 17:22:21.796'),
(2, 'Marketing', '2024-09-06 17:22:32.668'),
(3, 'Sales', '2024-09-06 17:22:46.678'),
(4, 'Adverticement', '2024-09-06 17:23:08.912'),
(5, 'Finance', '2024-09-06 17:23:20.485'),
(6, 'Human Resource', '2024-09-06 17:23:34.525'),
(7, 'Information Technology', '2024-09-06 17:23:48.537'),
(8, 'Security', '2024-09-06 17:23:56.230');

-- --------------------------------------------------------

--
-- Table structure for table `GRN`
--

CREATE TABLE `GRN` (
  `id` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `reciverId` int NOT NULL,
  `supplayerId` int NOT NULL,
  `purchasedOrderId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `GRNItem`
--

CREATE TABLE `GRNItem` (
  `id` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` int NOT NULL,
  `remark` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `grnId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `MaterialRequest`
--

CREATE TABLE `MaterialRequest` (
  `id` int NOT NULL,
  `requesterId` int NOT NULL,
  `departmentHeadId` int NOT NULL,
  `logisticSuperViserId` int DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `isApproviedByDH` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MaterialRequest`
--

INSERT INTO `MaterialRequest` (`id`, `requesterId`, `departmentHeadId`, `logisticSuperViserId`, `createdAt`, `isApproviedByDH`) VALUES
(4, 15, 5, NULL, '2024-09-23 09:01:43.941', 1),
(6, 15, 5, NULL, '2024-09-23 09:27:51.275', 0),
(12, 15, 5, NULL, '2024-09-25 09:26:03.791', 0),
(13, 17, 5, NULL, '2024-09-25 13:03:51.965', 1),
(14, 17, 5, NULL, '2024-09-25 13:04:01.953', 0),
(15, 15, 5, NULL, '2024-10-01 18:32:14.496', 0);

-- --------------------------------------------------------

--
-- Table structure for table `MaterialRequestItem`
--

CREATE TABLE `MaterialRequestItem` (
  `id` int NOT NULL,
  `materialRequestId` int NOT NULL,
  `productId` int NOT NULL,
  `quantityRequested` decimal(65,30) NOT NULL,
  `quantityInStock` decimal(65,30) DEFAULT NULL,
  `quantityToBePurchased` decimal(65,30) DEFAULT NULL,
  `remark` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MaterialRequestItem`
--

INSERT INTO `MaterialRequestItem` (`id`, `materialRequestId`, `productId`, `quantityRequested`, `quantityInStock`, `quantityToBePurchased`, `remark`) VALUES
(7, 4, 23, 89.000000000000000000000000000000, NULL, NULL, 'm'),
(9, 6, 21, 9.000000000000000000000000000000, NULL, NULL, 'The project involves renovating the office space to create a more collaborative environment. The goal is to enhance productivity and employee satisfaction.'),
(10, 6, 22, 9.000000000000000000000000000000, NULL, NULL, 'The project involves renovating the office space to create a more collaborative environment. The goal is to enhance productivity and employee satisfaction.'),
(11, 6, 23, 9.000000000000000000000000000000, NULL, NULL, 'The project involves renovating the office space to create a more collaborative environment. The goal is to enhance productivity and employee satisfaction.'),
(12, 6, 24, 9.000000000000000000000000000000, NULL, NULL, 'The project involves renovating the office space to create a more collaborative environment. The goal is to enhance productivity and employee satisfaction.'),
(25, 12, 21, 9.000000000000000000000000000000, NULL, NULL, 'for urget'),
(26, 13, 21, 6.000000000000000000000000000000, NULL, NULL, 'reason'),
(28, 15, 23, 222.000000000000000000000000000000, NULL, NULL, '222');

-- --------------------------------------------------------

--
-- Table structure for table `OfferItem`
--

CREATE TABLE `OfferItem` (
  `id` int NOT NULL,
  `supplayerOfferId` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` decimal(65,30) NOT NULL,
  `unitPrice` decimal(65,30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `OfferItem`
--

INSERT INTO `OfferItem` (`id`, `supplayerOfferId`, `productId`, `quantity`, `unitPrice`) VALUES
(1, 1, 21, 33.000000000000000000000000000000, 200.000000000000000000000000000000),
(2, 2, 21, 33.000000000000000000000000000000, 200.000000000000000000000000000000),
(3, 3, 21, 33.000000000000000000000000000000, 200.000000000000000000000000000000);

-- --------------------------------------------------------

--
-- Table structure for table `Password`
--

CREATE TABLE `Password` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Password`
--

INSERT INTO `Password` (`id`, `userId`, `password`, `createdAt`) VALUES
(1, 1, '$2b$10$HK7tn5Xq7jCzPPgvie28LepAN2dzdnQ2X6LzneQZQQ/dz7srdKnQy', '2024-09-06 17:37:38.739'),
(2, 2, '$2b$10$m4Nc6wqmNLWCIxkaefvvwuxI7/ebRhEkTT5bCmZwqEbnrWSo3PAVS', '2024-09-06 17:39:52.814'),
(3, 3, '$2b$10$DJtWBGi1alXioIUbAbnQvOXknrPVboRRDHSMEI8ba.qjSO/H7MUhu', '2024-09-06 17:45:17.534'),
(5, 5, '$2b$10$LeecCniI3fxpoWLCS.LIT.5SFLhTpPqZKXzoq1WPPI31/rbNpS2Yi', '2024-09-07 18:52:25.617'),
(15, 15, '$2b$10$1g4sDAIFcnusSH7IhaZ1Lew/wYAvbqhOvYbgOzFWJC3sA7/IIXqfK', '2024-09-23 08:56:27.609'),
(17, 17, '$2b$10$t0JF0f4GPE9/R.kcyeLEcOV6bmEMUoUYcbcDF7bzBvZclykwab1Xi', '2024-09-25 12:11:37.593');

-- --------------------------------------------------------

--
-- Table structure for table `Product`
--

CREATE TABLE `Product` (
  `id` int NOT NULL,
  `subcategoryId` int NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Product`
--

INSERT INTO `Product` (`id`, `subcategoryId`, `name`, `createdAt`) VALUES
(21, 42, ' Samsung Galaxy A03', '2024-09-21 07:02:07.960'),
(22, 42, 'Samsung Galaxy S21', '2024-09-21 07:06:52.169'),
(23, 42, 'Awaze', '2024-09-21 07:10:22.850'),
(24, 42, 'Kerefa', '2024-09-21 07:12:37.450'),
(26, 45, 'Dell Desktop Computer', '2024-09-21 07:26:40.681'),
(28, 45, 'Hp laptop', '2024-09-21 07:32:08.572'),
(30, 52, 'Katch up', '2024-09-21 07:34:54.574'),
(49, 42, 'Awaze', '2024-09-24 10:51:57.038');

-- --------------------------------------------------------

--
-- Table structure for table `ProductAttribute`
--

CREATE TABLE `ProductAttribute` (
  `id` int NOT NULL,
  `productId` int NOT NULL,
  `templateAttributeId` int NOT NULL,
  `value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ProductAttribute`
--

INSERT INTO `ProductAttribute` (`id`, `productId`, `templateAttributeId`, `value`) VALUES
(125, 21, 73, 'Galaxy A03'),
(126, 21, 74, 'Samsung'),
(127, 21, 75, 'Android 11'),
(128, 21, 76, '6.5 inches'),
(129, 21, 77, 'Unisoc T606'),
(130, 21, 78, '4 GB'),
(131, 21, 79, '128 GB'),
(132, 21, 80, 'Dual 48 MP + 2 MP'),
(133, 21, 81, '5000 mAh'),
(134, 21, 82, 'kk'),
(135, 21, 83, 'mm'),
(136, 21, 84, 'Black'),
(137, 21, 85, '23000'),
(138, 21, 86, '2 year'),
(139, 22, 73, 'Galaxy S21'),
(140, 22, 74, 'Samsung'),
(141, 22, 75, 'Android 11'),
(142, 22, 76, '6.2 inches'),
(143, 22, 77, 'Exynos 2100 / Snapdragon 888'),
(144, 22, 78, '8 GB'),
(145, 22, 79, '256 GB'),
(146, 22, 80, 'Triple 12 MP + 64 MP + 12 MP'),
(147, 22, 81, '4000 mAh'),
(148, 22, 82, 'nn'),
(149, 22, 83, 'nn'),
(150, 22, 84, 'Pink'),
(151, 22, 85, '50000'),
(152, 22, 86, '2 year'),
(153, 23, 87, 'Safari'),
(154, 23, 88, 'Safari'),
(155, 23, 89, 'nn'),
(156, 23, 90, '2.4 inches'),
(157, 23, 91, '7000'),
(158, 23, 92, '4G'),
(159, 23, 93, 'jk'),
(160, 23, 94, '1200 mAh'),
(161, 23, 95, ''),
(162, 24, 87, 'Kerefa'),
(163, 24, 88, 'Safari'),
(164, 24, 89, ''),
(165, 24, 90, ''),
(166, 24, 91, '8000'),
(167, 24, 92, '4G'),
(168, 24, 93, ''),
(169, 24, 94, '1400 mAh'),
(170, 24, 95, '2.4 inches'),
(180, 26, 114, 'Inspiron 3880'),
(181, 26, 115, 'Dell'),
(182, 26, 116, 'Intel Core i5-11400'),
(183, 26, 117, '8 GB DDR4'),
(184, 26, 118, 'HDD'),
(185, 26, 119, '1 TB'),
(186, 26, 120, 'Intel UHD Graphics 730'),
(187, 26, 121, '16 inch'),
(188, 26, 122, 'Windows 11 Home'),
(189, 26, 123, ''),
(191, 28, 114, 'Pavilion 15\"'),
(192, 28, 115, 'HP'),
(193, 28, 116, 'AMD Ryzen 5 5500U'),
(194, 28, 117, '16 GB DDR4'),
(195, 28, 118, 'SSD'),
(196, 28, 119, '512 GB'),
(197, 28, 120, 'AMD Radeon Graphics'),
(198, 28, 121, '14 inch'),
(199, 28, 122, 'Windows 11 Home'),
(200, 28, 123, 'Up to 9 hours'),
(202, 28, 124, '60000'),
(204, 28, 125, '2 year'),
(215, 30, 147, 'Ketchup'),
(216, 30, 148, 'Dutch katchup'),
(217, 30, 149, '9/21/2029'),
(218, 30, 150, '5lt'),
(219, 30, 151, 'Sweet'),
(220, 30, 152, '2000'),
(351, 41, 159, 'Double a'),
(352, 41, 160, 'white'),
(353, 41, 161, 'A4'),
(354, 41, 162, ''),
(355, 42, 159, 'Double a'),
(357, 44, 159, 'Double a'),
(358, 45, 159, 'Double a'),
(360, 42, 160, 'white'),
(361, 44, 160, 'white'),
(362, 46, 159, 'Double a'),
(363, 45, 160, 'white'),
(364, 47, 159, 'Double a'),
(366, 44, 161, 'A4 paper'),
(367, 42, 161, 'A4 paper'),
(368, 46, 160, 'white'),
(369, 45, 161, 'A4 paper'),
(371, 47, 160, 'white'),
(372, 42, 162, ''),
(373, 44, 162, ''),
(374, 46, 161, 'A4 paper'),
(375, 45, 162, ''),
(376, 47, 161, 'A4 paper'),
(377, 46, 162, ''),
(378, 47, 162, ''),
(393, 49, 73, ''),
(394, 49, 74, ''),
(395, 49, 75, ''),
(396, 49, 76, ''),
(398, 49, 77, ''),
(400, 49, 78, '4GB'),
(402, 49, 79, '8GB'),
(404, 49, 80, ''),
(406, 49, 81, ''),
(408, 49, 82, ''),
(410, 49, 83, ''),
(412, 49, 84, ''),
(414, 49, 85, ''),
(417, 49, 86, '');

-- --------------------------------------------------------

--
-- Table structure for table `ProductCategory`
--

CREATE TABLE `ProductCategory` (
  `id` int NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ProductCategory`
--

INSERT INTO `ProductCategory` (`id`, `name`, `createdAt`) VALUES
(12, 'Elctronics', '2024-09-21 05:58:02.212'),
(13, 'Telecom Service', '2024-09-21 05:58:19.403'),
(14, 'Furniture', '2024-09-21 05:58:30.562'),
(15, 'Food product', '2024-09-21 05:59:03.675'),
(16, 'Stationary', '2024-09-21 05:59:31.308'),
(18, 'Kerefa', '2024-09-24 10:54:28.862');

-- --------------------------------------------------------

--
-- Table structure for table `ProductSubCategory`
--

CREATE TABLE `ProductSubCategory` (
  `id` int NOT NULL,
  `categoryId` int NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ProductSubCategory`
--

INSERT INTO `ProductSubCategory` (`id`, `categoryId`, `name`, `createdAt`) VALUES
(42, 12, 'Mobile Devices', '2024-09-21 06:00:18.035'),
(43, 12, 'Networking Device', '2024-09-21 06:00:36.730'),
(44, 12, 'Tablets', '2024-09-21 06:00:49.877'),
(45, 12, 'Computer', '2024-09-21 06:01:02.412'),
(46, 12, 'Audio equipment', '2024-09-21 06:01:19.215'),
(47, 13, 'Sim card', '2024-09-21 06:01:31.590'),
(48, 13, 'Air time', '2024-09-21 06:01:43.714'),
(49, 14, 'Chairs', '2024-09-21 06:02:05.670'),
(50, 14, 'Tables', '2024-09-21 06:02:18.607'),
(51, 14, 'Displays Equipment', '2024-09-21 06:02:37.981'),
(52, 15, 'Condiments', '2024-09-21 06:03:00.940'),
(53, 15, 'Food ingredients', '2024-09-21 06:03:19.308'),
(54, 16, 'Writing Instruments', '2024-09-21 06:05:12.071'),
(55, 16, 'Organizational Tools', '2024-09-21 06:05:51.565'),
(57, 16, 'Office Supplies', '2024-09-21 06:06:33.495'),
(58, 16, 'Paper Products', '2024-09-21 06:09:57.596');

-- --------------------------------------------------------

--
-- Table structure for table `Profile`
--

CREATE TABLE `Profile` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `firstName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `middleName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` enum('MALE','FEMALE') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'MALE',
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imgUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `addressId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Profile`
--

INSERT INTO `Profile` (`id`, `userId`, `firstName`, `lastName`, `middleName`, `gender`, `phone`, `imgUrl`, `addressId`) VALUES
(1, 1, 'Yohanna', 'Tefera', 'Engdaw', 'FEMALE', '0911009911', NULL, 4),
(2, 2, 'Markos', 'Alehegn', 'Mamo', 'MALE', '0911003333', NULL, 2),
(3, 3, 'Kiya', 'Alehegn', 'Tilahun', 'MALE', '0909080803', NULL, 3),
(5, 5, 'Kibru', 'Alewu', 'Tilahun', 'MALE', '0533773333', NULL, 3),
(15, 15, 'Tsinat', 'Yosef', 'Misganaw', 'FEMALE', '0924892045', NULL, 37),
(17, 17, 'Mihiretu', 'Hailegiorgis', 'Tigistu', 'MALE', '0904825407', NULL, 39);

-- --------------------------------------------------------

--
-- Table structure for table `PurceasedRequestedItem`
--

CREATE TABLE `PurceasedRequestedItem` (
  `id` int NOT NULL,
  `productId` int NOT NULL,
  `purchasedRequestId` int NOT NULL,
  `quantityToBePurchased` decimal(65,30) NOT NULL,
  `remark` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unitPrice` decimal(65,30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `PurceasedRequestedItem`
--

INSERT INTO `PurceasedRequestedItem` (`id`, `productId`, `purchasedRequestId`, `quantityToBePurchased`, `remark`, `unitPrice`) VALUES
(4, 21, 4, 599.000000000000000000000000000000, 'for personal use', 120.000000000000000000000000000000),
(21, 23, 12, 599.000000000000000000000000000000, 'for personal use ', 120.000000000000000000000000000000),
(22, 24, 12, 909.000000000000000000000000000000, 'for personal use', 120.000000000000000000000000000000);

-- --------------------------------------------------------

--
-- Table structure for table `PurchasedOrder`
--

CREATE TABLE `PurchasedOrder` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `PurchasedOrder`
--

INSERT INTO `PurchasedOrder` (`id`, `userId`, `createdAt`) VALUES
(4, 17, '2024-10-04 18:20:26.750'),
(6, 17, '2024-10-04 18:27:24.926'),
(7, 17, '2024-10-04 18:29:35.885'),
(8, 17, '2024-10-04 18:35:41.509'),
(9, 17, '2024-10-04 18:36:45.944'),
(10, 17, '2024-10-04 18:36:51.420'),
(11, 17, '2024-10-04 18:39:11.714'),
(12, 17, '2024-10-04 18:39:57.094');

-- --------------------------------------------------------

--
-- Table structure for table `PurchasedOrderItem`
--

CREATE TABLE `PurchasedOrderItem` (
  `id` int NOT NULL,
  `purchasOrderId` int NOT NULL,
  `productId` int NOT NULL,
  `quantityToBePurchased` decimal(65,30) NOT NULL,
  `remark` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `PurchasedOrderItem`
--

INSERT INTO `PurchasedOrderItem` (`id`, `purchasOrderId`, `productId`, `quantityToBePurchased`, `remark`) VALUES
(2, 4, 22, 599.000000000000000000000000000000, 'for personal use'),
(6, 6, 22, 599.000000000000000000000000000000, 'for personal use'),
(7, 6, 23, 599.000000000000000000000000000000, 'for urget'),
(8, 6, 24, 599.000000000000000000000000000000, 'for office use'),
(18, 12, 22, 599.000000000000000000000000000000, 'for personal use'),
(19, 12, 23, 599.000000000000000000000000000000, 'for urget'),
(20, 12, 30, 599.000000000000000000000000000000, 'for office use');

-- --------------------------------------------------------

--
-- Table structure for table `PurchasedRequest`
--

CREATE TABLE `PurchasedRequest` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `isApproviedByGM` tinyint(1) NOT NULL DEFAULT '0',
  `isApproviedByFinance` tinyint(1) NOT NULL DEFAULT '0',
  `totalPrice` decimal(65,30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `PurchasedRequest`
--

INSERT INTO `PurchasedRequest` (`id`, `userId`, `createdAt`, `isApproviedByGM`, `isApproviedByFinance`, `totalPrice`) VALUES
(4, 1, '2024-09-23 14:10:33.064', 0, 0, 456.000000000000000000000000000000),
(12, 1, '2024-09-25 11:29:02.214', 0, 0, 203999.000000000000000000000000000000);

-- --------------------------------------------------------

--
-- Table structure for table `Store`
--

CREATE TABLE `Store` (
  `id` int NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `addressId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Store`
--

INSERT INTO `Store` (`id`, `name`, `addressId`, `createdAt`) VALUES
(8, 'A.A GORO ', 27, '2024-09-21 07:52:04.188'),
(9, 'A.A  meta', 28, '2024-09-21 07:53:36.022'),
(10, 'Ambo', 29, '2024-09-21 07:55:00.189'),
(11, 'Bishofitu', 30, '2024-09-21 07:55:48.086'),
(12, 'Butajira', 31, '2024-09-21 07:56:12.095'),
(13, 'Hoshana', 32, '2024-09-21 07:56:52.360'),
(14, 'Jimma', 33, '2024-09-21 07:57:17.614'),
(15, 'Metu', 34, '2024-09-21 07:57:56.118'),
(16, 'Weliketa', 35, '2024-09-21 07:58:21.919');

-- --------------------------------------------------------

--
-- Table structure for table `StoreInventory`
--

CREATE TABLE `StoreInventory` (
  `id` int NOT NULL,
  `storId` int NOT NULL,
  `userId` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` int NOT NULL,
  `currentQuantity` int NOT NULL,
  `type` enum('IN','OUT') COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `SupplayerOffer`
--

CREATE TABLE `SupplayerOffer` (
  `id` int NOT NULL,
  `purchasedOrderId` int NOT NULL,
  `supplayerId` int NOT NULL,
  `totalPrice` decimal(65,30) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `SupplayerOffer`
--

INSERT INTO `SupplayerOffer` (`id`, `purchasedOrderId`, `supplayerId`, `totalPrice`, `createdAt`) VALUES
(1, 4, 8, 344.000000000000000000000000000000, '2024-10-05 05:11:24.615'),
(2, 4, 8, 344.000000000000000000000000000000, '2024-10-05 05:12:52.980'),
(3, 4, 8, 344.000000000000000000000000000000, '2024-10-05 05:13:05.531');

-- --------------------------------------------------------

--
-- Table structure for table `SupplierCategory`
--

CREATE TABLE `SupplierCategory` (
  `id` int NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `SupplierCategory`
--

INSERT INTO `SupplierCategory` (`id`, `name`, `createdAt`) VALUES
(1, 'Food', '2024-09-06 19:51:31.330'),
(2, 'Electronics', '2024-09-06 19:51:43.625'),
(3, 'Telecom service', '2024-09-06 19:51:55.100');

-- --------------------------------------------------------

--
-- Table structure for table `Suppliers`
--

CREATE TABLE `Suppliers` (
  `id` int NOT NULL,
  `categoryId` int NOT NULL,
  `fullName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `addressId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Suppliers`
--

INSERT INTO `Suppliers` (`id`, `categoryId`, `fullName`, `phone`, `email`, `addressId`, `createdAt`) VALUES
(8, 1, 'Dutch ', '0988112233', 'dutch@gmail.com', 24, '2024-09-21 07:46:06.057'),
(9, 3, 'Safaricom', '0988120934', 'safari@gmail.com', 25, '2024-09-21 07:47:00.947'),
(10, 2, 'Amch', '0965199012', 'amch@gmail.com', 26, '2024-09-21 07:48:45.279');

-- --------------------------------------------------------

--
-- Table structure for table `Template`
--

CREATE TABLE `Template` (
  `id` int NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Template`
--

INSERT INTO `Template` (`id`, `name`, `createdAt`) VALUES
(18, 'Smart phone', '2024-09-21 06:16:04.980'),
(19, 'Basic phone', '2024-09-21 06:18:51.963'),
(20, 'Router', '2024-09-21 06:21:24.421'),
(21, 'MiFi devices', '2024-09-21 06:23:49.441'),
(22, 'Desktop and laptops', '2024-09-21 06:27:18.027'),
(23, 'Audio Device', '2024-09-21 06:33:17.558'),
(24, 'Chairs', '2024-09-21 06:36:08.057'),
(27, 'Sauces', '2024-09-21 06:48:58.361'),
(28, 'Food Coloring', '2024-09-21 06:50:40.369'),
(29, 'Stationery Attributes', '2024-09-21 06:55:49.868'),
(30, 'Air time', '2024-09-21 07:36:45.997'),
(31, 'Writing instrument', '2024-09-23 07:43:48.773');

-- --------------------------------------------------------

--
-- Table structure for table `TemplateAttribute`
--

CREATE TABLE `TemplateAttribute` (
  `id` int NOT NULL,
  `templateId` int NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dataType` enum('STRING','DATE_TIME','DOUBLE','INT') COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `TemplateAttribute`
--

INSERT INTO `TemplateAttribute` (`id`, `templateId`, `name`, `dataType`) VALUES
(73, 18, 'Model', 'STRING'),
(74, 18, 'Brand', 'STRING'),
(75, 18, 'Operating System', 'STRING'),
(76, 18, 'Display', 'DOUBLE'),
(77, 18, 'Processor', 'STRING'),
(78, 18, 'RAM', 'INT'),
(79, 18, 'Storage', 'STRING'),
(80, 18, 'Camera', 'STRING'),
(81, 18, 'Battery', 'INT'),
(82, 18, 'Connectivity', 'STRING'),
(83, 18, 'Dimensions & Weight', 'STRING'),
(84, 18, 'Color', 'STRING'),
(85, 18, 'Price', 'DOUBLE'),
(86, 18, 'Warranty', 'STRING'),
(87, 19, 'Model', 'STRING'),
(88, 19, 'Brand', 'STRING'),
(89, 19, 'Operating System	', 'STRING'),
(90, 19, 'Dimensions', 'STRING'),
(91, 19, 'Price	', 'DOUBLE'),
(92, 19, 'Network Support	', 'STRING'),
(93, 19, 'Bluetooth Version', 'STRING'),
(94, 19, 'Battery Capacity', 'STRING'),
(95, 19, 'Display Size', 'STRING'),
(96, 20, 'Model', 'STRING'),
(97, 20, 'Type', 'STRING'),
(98, 20, 'Frequency Bands	', 'STRING'),
(99, 20, 'Wi-Fi Standards	', 'STRING'),
(100, 20, 'Speed', 'DOUBLE'),
(101, 20, 'Power Supply	', 'STRING'),
(102, 20, 'Price', 'DOUBLE'),
(103, 20, 'Warranty	', 'STRING'),
(104, 20, 'Operating System	', 'STRING'),
(105, 21, 'Brand', 'STRING'),
(106, 21, 'Model', 'STRING'),
(107, 21, 'Network Technology', 'STRING'),
(108, 21, 'Speed', 'DOUBLE'),
(109, 21, 'Battery Capacity', 'DOUBLE'),
(110, 21, 'Wi-Fi Standards', 'STRING'),
(111, 21, 'Operating System', 'STRING'),
(112, 21, 'Price', 'DOUBLE'),
(113, 21, 'Warranty', 'STRING'),
(114, 22, 'Model', 'STRING'),
(115, 22, 'Brand', 'STRING'),
(116, 22, 'Processor', 'STRING'),
(117, 22, 'RAM', 'INT'),
(118, 22, 'Storage Type', 'STRING'),
(119, 22, 'Storage Capacity', 'INT'),
(120, 22, 'Graphics Card', 'STRING'),
(121, 22, 'Display Size', 'STRING'),
(122, 22, 'Operating System', 'STRING'),
(123, 22, 'Battery Life', 'DOUBLE'),
(124, 22, 'Price', 'DOUBLE'),
(125, 22, 'Warranty', 'STRING'),
(126, 23, 'Brand', 'STRING'),
(127, 23, 'Model', 'STRING'),
(128, 23, 'Connection Type', 'STRING'),
(129, 23, 'Frequency Response', 'STRING'),
(130, 23, 'Battery Life', 'INT'),
(131, 23, 'Microphone', 'STRING'),
(132, 23, 'Price', 'DOUBLE'),
(133, 23, 'Warranty', 'STRING'),
(134, 24, 'Type', 'STRING'),
(135, 24, 'Material', 'STRING'),
(136, 24, 'Color', 'STRING'),
(137, 24, 'Style', 'STRING'),
(138, 25, 'Type', 'STRING'),
(139, 25, 'Material', 'STRING'),
(140, 25, 'Color', 'STRING'),
(141, 25, 'Style', 'STRING'),
(142, 26, 'Material', 'STRING'),
(143, 26, 'Color', 'STRING'),
(144, 26, 'Features', 'STRING'),
(145, 26, 'Design Type	', 'STRING'),
(146, 26, 'Dimensions', 'STRING'),
(147, 27, 'Types', 'STRING'),
(148, 27, 'Name', 'STRING'),
(149, 27, 'Ingredients', 'STRING'),
(150, 27, 'Size', 'DOUBLE'),
(151, 27, 'Flavors', 'STRING'),
(152, 27, 'Price', 'DOUBLE'),
(153, 28, 'Name', 'STRING'),
(154, 28, 'Color', 'STRING'),
(155, 28, 'Price', 'STRING'),
(156, 28, 'Size', 'STRING'),
(157, 28, 'Storage Instructions', 'STRING'),
(158, 28, 'Expire date', 'STRING'),
(159, 29, 'Brand', 'STRING'),
(160, 29, 'Color', 'STRING'),
(161, 29, 'Size', 'STRING'),
(162, 29, 'Material', 'STRING'),
(163, 30, 'Price', 'DOUBLE'),
(164, 30, 'Amount', 'INT'),
(165, 31, 'Brand', 'STRING'),
(166, 31, 'Color', 'STRING'),
(167, 31, 'Price', 'STRING');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activeStatus` enum('ACTIVE','INACTIVE','BLOCKED') COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('ADMIN','EMPLOYEE','DEPARTMENT_HEAD','LOGESTIC_SUPERVISER','FINANCE','GENERAL_MANAGER','STORE_KEEPER') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'EMPLOYEE',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `departmentId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `email`, `activeStatus`, `role`, `createdAt`, `departmentId`) VALUES
(1, 'yohanna@gmail.com', 'ACTIVE', 'GENERAL_MANAGER', '2024-09-06 17:37:38.739', 2),
(2, 'markos@gmail.com', 'ACTIVE', 'FINANCE', '2024-09-06 17:39:52.814', 2),
(3, 'kiyu@gmail.com', 'ACTIVE', 'ADMIN', '2024-09-06 17:45:17.534', 8),
(5, 'kibru@gmail.com', 'ACTIVE', 'DEPARTMENT_HEAD', '2024-09-07 18:52:25.617', 3),
(15, 'maritu@gmail.com', 'ACTIVE', 'EMPLOYEE', '2024-09-23 08:56:27.609', 6),
(17, 'mihiretu@gmail.com', 'ACTIVE', 'LOGESTIC_SUPERVISER', '2024-09-25 12:11:37.593', 7);

-- --------------------------------------------------------

--
-- Table structure for table `Winner`
--

CREATE TABLE `Winner` (
  `id` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `supplayerId` int NOT NULL,
  `purchasedOrderId` int NOT NULL,
  `userId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_MaterialRequestItemToProductAttribute`
--

CREATE TABLE `_MaterialRequestItemToProductAttribute` (
  `A` int NOT NULL,
  `B` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_OfferItemToProduct`
--

CREATE TABLE `_OfferItemToProduct` (
  `A` int NOT NULL,
  `B` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_ProductToPurceasedRequestedItem`
--

CREATE TABLE `_ProductToPurceasedRequestedItem` (
  `A` int NOT NULL,
  `B` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_ProductToPurchasedOrderItem`
--

CREATE TABLE `_ProductToPurchasedOrderItem` (
  `A` int NOT NULL,
  `B` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_PurceasedRequestedItemToPurchasedRequest`
--

CREATE TABLE `_PurceasedRequestedItemToPurchasedRequest` (
  `A` int NOT NULL,
  `B` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_PurchasedOrderToPurchasedOrderItem`
--

CREATE TABLE `_PurchasedOrderToPurchasedOrderItem` (
  `A` int NOT NULL,
  `B` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Address`
--
ALTER TABLE `Address`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Department`
--
ALTER TABLE `Department`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Department_name_key` (`name`);

--
-- Indexes for table `GRN`
--
ALTER TABLE `GRN`
  ADD PRIMARY KEY (`id`),
  ADD KEY `GRN_reciverId_fkey` (`reciverId`),
  ADD KEY `GRN_supplayerId_fkey` (`supplayerId`),
  ADD KEY `GRN_purchasedOrderId_fkey` (`purchasedOrderId`);

--
-- Indexes for table `GRNItem`
--
ALTER TABLE `GRNItem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `GRNItem_grnId_fkey` (`grnId`);

--
-- Indexes for table `MaterialRequest`
--
ALTER TABLE `MaterialRequest`
  ADD PRIMARY KEY (`id`),
  ADD KEY `MaterialRequest_requesterId_fkey` (`requesterId`),
  ADD KEY `MaterialRequest_departmentHeadId_fkey` (`departmentHeadId`),
  ADD KEY `MaterialRequest_logisticSuperViserId_fkey` (`logisticSuperViserId`);

--
-- Indexes for table `MaterialRequestItem`
--
ALTER TABLE `MaterialRequestItem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `MaterialRequestItem_materialRequestId_fkey` (`materialRequestId`),
  ADD KEY `MaterialRequestItem_productId_fkey` (`productId`);

--
-- Indexes for table `OfferItem`
--
ALTER TABLE `OfferItem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `OfferItem_supplayerOfferId_fkey` (`supplayerOfferId`);

--
-- Indexes for table `Password`
--
ALTER TABLE `Password`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Password_userId_key` (`userId`);

--
-- Indexes for table `Product`
--
ALTER TABLE `Product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Product_subcategoryId_fkey` (`subcategoryId`);

--
-- Indexes for table `ProductAttribute`
--
ALTER TABLE `ProductAttribute`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ProductAttribute_productId_fkey` (`productId`),
  ADD KEY `ProductAttribute_templateAttributeId_fkey` (`templateAttributeId`);

--
-- Indexes for table `ProductCategory`
--
ALTER TABLE `ProductCategory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ProductSubCategory`
--
ALTER TABLE `ProductSubCategory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ProductSubCategory_categoryId_fkey` (`categoryId`);

--
-- Indexes for table `Profile`
--
ALTER TABLE `Profile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Profile_userId_key` (`userId`),
  ADD UNIQUE KEY `Profile_phone_key` (`phone`),
  ADD KEY `Profile_addressId_fkey` (`addressId`);

--
-- Indexes for table `PurceasedRequestedItem`
--
ALTER TABLE `PurceasedRequestedItem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `PurceasedRequestedItem_purchasedRequestId_fkey` (`purchasedRequestId`);

--
-- Indexes for table `PurchasedOrder`
--
ALTER TABLE `PurchasedOrder`
  ADD PRIMARY KEY (`id`),
  ADD KEY `PurchasedOrder_userId_fkey` (`userId`);

--
-- Indexes for table `PurchasedOrderItem`
--
ALTER TABLE `PurchasedOrderItem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `PurchasedOrderItem_purchasOrderId_fkey` (`purchasOrderId`);

--
-- Indexes for table `PurchasedRequest`
--
ALTER TABLE `PurchasedRequest`
  ADD PRIMARY KEY (`id`),
  ADD KEY `PurchasedRequest_userId_fkey` (`userId`);

--
-- Indexes for table `Store`
--
ALTER TABLE `Store`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Store_addressId_fkey` (`addressId`);

--
-- Indexes for table `StoreInventory`
--
ALTER TABLE `StoreInventory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `StoreInventory_productId_fkey` (`productId`),
  ADD KEY `StoreInventory_userId_fkey` (`userId`),
  ADD KEY `StoreInventory_storId_fkey` (`storId`);

--
-- Indexes for table `SupplayerOffer`
--
ALTER TABLE `SupplayerOffer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `SupplayerOffer_purchasedOrderId_fkey` (`purchasedOrderId`),
  ADD KEY `SupplayerOffer_supplayerId_fkey` (`supplayerId`);

--
-- Indexes for table `SupplierCategory`
--
ALTER TABLE `SupplierCategory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Suppliers`
--
ALTER TABLE `Suppliers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Suppliers_phone_key` (`phone`),
  ADD UNIQUE KEY `Suppliers_email_key` (`email`),
  ADD KEY `Suppliers_categoryId_fkey` (`categoryId`),
  ADD KEY `Suppliers_addressId_fkey` (`addressId`);

--
-- Indexes for table `Template`
--
ALTER TABLE `Template`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `TemplateAttribute`
--
ALTER TABLE `TemplateAttribute`
  ADD PRIMARY KEY (`id`),
  ADD KEY `TemplateAttribute_templateId_fkey` (`templateId`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Users_email_key` (`email`),
  ADD KEY `Users_departmentId_fkey` (`departmentId`);

--
-- Indexes for table `Winner`
--
ALTER TABLE `Winner`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Winner_purchasedOrderId_fkey` (`purchasedOrderId`),
  ADD KEY `Winner_supplayerId_fkey` (`supplayerId`),
  ADD KEY `Winner_userId_fkey` (`userId`);

--
-- Indexes for table `_MaterialRequestItemToProductAttribute`
--
ALTER TABLE `_MaterialRequestItemToProductAttribute`
  ADD UNIQUE KEY `_MaterialRequestItemToProductAttribute_AB_unique` (`A`,`B`),
  ADD KEY `_MaterialRequestItemToProductAttribute_B_index` (`B`);

--
-- Indexes for table `_OfferItemToProduct`
--
ALTER TABLE `_OfferItemToProduct`
  ADD UNIQUE KEY `_OfferItemToProduct_AB_unique` (`A`,`B`),
  ADD KEY `_OfferItemToProduct_B_index` (`B`);

--
-- Indexes for table `_ProductToPurceasedRequestedItem`
--
ALTER TABLE `_ProductToPurceasedRequestedItem`
  ADD UNIQUE KEY `_ProductToPurceasedRequestedItem_AB_unique` (`A`,`B`),
  ADD KEY `_ProductToPurceasedRequestedItem_B_index` (`B`);

--
-- Indexes for table `_ProductToPurchasedOrderItem`
--
ALTER TABLE `_ProductToPurchasedOrderItem`
  ADD UNIQUE KEY `_ProductToPurchasedOrderItem_AB_unique` (`A`,`B`),
  ADD KEY `_ProductToPurchasedOrderItem_B_index` (`B`);

--
-- Indexes for table `_PurceasedRequestedItemToPurchasedRequest`
--
ALTER TABLE `_PurceasedRequestedItemToPurchasedRequest`
  ADD UNIQUE KEY `_PurceasedRequestedItemToPurchasedRequest_AB_unique` (`A`,`B`),
  ADD KEY `_PurceasedRequestedItemToPurchasedRequest_B_index` (`B`);

--
-- Indexes for table `_PurchasedOrderToPurchasedOrderItem`
--
ALTER TABLE `_PurchasedOrderToPurchasedOrderItem`
  ADD UNIQUE KEY `_PurchasedOrderToPurchasedOrderItem_AB_unique` (`A`,`B`),
  ADD KEY `_PurchasedOrderToPurchasedOrderItem_B_index` (`B`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Address`
--
ALTER TABLE `Address`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `Department`
--
ALTER TABLE `Department`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `GRN`
--
ALTER TABLE `GRN`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `GRNItem`
--
ALTER TABLE `GRNItem`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `MaterialRequest`
--
ALTER TABLE `MaterialRequest`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `MaterialRequestItem`
--
ALTER TABLE `MaterialRequestItem`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `OfferItem`
--
ALTER TABLE `OfferItem`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Password`
--
ALTER TABLE `Password`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `Product`
--
ALTER TABLE `Product`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `ProductAttribute`
--
ALTER TABLE `ProductAttribute`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=444;

--
-- AUTO_INCREMENT for table `ProductCategory`
--
ALTER TABLE `ProductCategory`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `ProductSubCategory`
--
ALTER TABLE `ProductSubCategory`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `Profile`
--
ALTER TABLE `Profile`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `PurceasedRequestedItem`
--
ALTER TABLE `PurceasedRequestedItem`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `PurchasedOrder`
--
ALTER TABLE `PurchasedOrder`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `PurchasedOrderItem`
--
ALTER TABLE `PurchasedOrderItem`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `PurchasedRequest`
--
ALTER TABLE `PurchasedRequest`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `Store`
--
ALTER TABLE `Store`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `StoreInventory`
--
ALTER TABLE `StoreInventory`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `SupplayerOffer`
--
ALTER TABLE `SupplayerOffer`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `SupplierCategory`
--
ALTER TABLE `SupplierCategory`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Suppliers`
--
ALTER TABLE `Suppliers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `Template`
--
ALTER TABLE `Template`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `TemplateAttribute`
--
ALTER TABLE `TemplateAttribute`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=168;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `Winner`
--
ALTER TABLE `Winner`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `GRN`
--
ALTER TABLE `GRN`
  ADD CONSTRAINT `GRN_purchasedOrderId_fkey` FOREIGN KEY (`purchasedOrderId`) REFERENCES `PurchasedOrder` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `GRN_reciverId_fkey` FOREIGN KEY (`reciverId`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `GRN_supplayerId_fkey` FOREIGN KEY (`supplayerId`) REFERENCES `Suppliers` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `GRNItem`
--
ALTER TABLE `GRNItem`
  ADD CONSTRAINT `GRNItem_grnId_fkey` FOREIGN KEY (`grnId`) REFERENCES `GRN` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `MaterialRequest`
--
ALTER TABLE `MaterialRequest`
  ADD CONSTRAINT `MaterialRequest_departmentHeadId_fkey` FOREIGN KEY (`departmentHeadId`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `MaterialRequest_logisticSuperViserId_fkey` FOREIGN KEY (`logisticSuperViserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `MaterialRequest_requesterId_fkey` FOREIGN KEY (`requesterId`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `MaterialRequestItem`
--
ALTER TABLE `MaterialRequestItem`
  ADD CONSTRAINT `MaterialRequestItem_materialRequestId_fkey` FOREIGN KEY (`materialRequestId`) REFERENCES `MaterialRequest` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `MaterialRequestItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `OfferItem`
--
ALTER TABLE `OfferItem`
  ADD CONSTRAINT `OfferItem_supplayerOfferId_fkey` FOREIGN KEY (`supplayerOfferId`) REFERENCES `SupplayerOffer` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `Password`
--
ALTER TABLE `Password`
  ADD CONSTRAINT `Password_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `Product`
--
ALTER TABLE `Product`
  ADD CONSTRAINT `Product_subcategoryId_fkey` FOREIGN KEY (`subcategoryId`) REFERENCES `ProductSubCategory` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `ProductAttribute`
--
ALTER TABLE `ProductAttribute`
  ADD CONSTRAINT `ProductAttribute_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ProductAttribute_templateAttributeId_fkey` FOREIGN KEY (`templateAttributeId`) REFERENCES `TemplateAttribute` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `ProductSubCategory`
--
ALTER TABLE `ProductSubCategory`
  ADD CONSTRAINT `ProductSubCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `ProductCategory` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `Profile`
--
ALTER TABLE `Profile`
  ADD CONSTRAINT `Profile_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `PurceasedRequestedItem`
--
ALTER TABLE `PurceasedRequestedItem`
  ADD CONSTRAINT `PurceasedRequestedItem_purchasedRequestId_fkey` FOREIGN KEY (`purchasedRequestId`) REFERENCES `MaterialRequest` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `PurchasedOrder`
--
ALTER TABLE `PurchasedOrder`
  ADD CONSTRAINT `PurchasedOrder_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `PurchasedOrderItem`
--
ALTER TABLE `PurchasedOrderItem`
  ADD CONSTRAINT `PurchasedOrderItem_purchasOrderId_fkey` FOREIGN KEY (`purchasOrderId`) REFERENCES `MaterialRequest` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `PurchasedRequest`
--
ALTER TABLE `PurchasedRequest`
  ADD CONSTRAINT `PurchasedRequest_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `Store`
--
ALTER TABLE `Store`
  ADD CONSTRAINT `Store_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `StoreInventory`
--
ALTER TABLE `StoreInventory`
  ADD CONSTRAINT `StoreInventory_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `StoreInventory_storId_fkey` FOREIGN KEY (`storId`) REFERENCES `Store` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `StoreInventory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `SupplayerOffer`
--
ALTER TABLE `SupplayerOffer`
  ADD CONSTRAINT `SupplayerOffer_purchasedOrderId_fkey` FOREIGN KEY (`purchasedOrderId`) REFERENCES `PurchasedOrder` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `SupplayerOffer_supplayerId_fkey` FOREIGN KEY (`supplayerId`) REFERENCES `Suppliers` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `Suppliers`
--
ALTER TABLE `Suppliers`
  ADD CONSTRAINT `Suppliers_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `Suppliers_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `SupplierCategory` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `TemplateAttribute`
--
ALTER TABLE `TemplateAttribute`
  ADD CONSTRAINT `TemplateAttribute_templateId_fkey` FOREIGN KEY (`templateId`) REFERENCES `Template` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `Users`
--
ALTER TABLE `Users`
  ADD CONSTRAINT `Users_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `Winner`
--
ALTER TABLE `Winner`
  ADD CONSTRAINT `Winner_purchasedOrderId_fkey` FOREIGN KEY (`purchasedOrderId`) REFERENCES `PurchasedOrder` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `Winner_supplayerId_fkey` FOREIGN KEY (`supplayerId`) REFERENCES `Suppliers` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `Winner_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `_MaterialRequestItemToProductAttribute`
--
ALTER TABLE `_MaterialRequestItemToProductAttribute`
  ADD CONSTRAINT `_MaterialRequestItemToProductAttribute_A_fkey` FOREIGN KEY (`A`) REFERENCES `MaterialRequestItem` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_MaterialRequestItemToProductAttribute_B_fkey` FOREIGN KEY (`B`) REFERENCES `ProductAttribute` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `_OfferItemToProduct`
--
ALTER TABLE `_OfferItemToProduct`
  ADD CONSTRAINT `_OfferItemToProduct_A_fkey` FOREIGN KEY (`A`) REFERENCES `OfferItem` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_OfferItemToProduct_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `_ProductToPurceasedRequestedItem`
--
ALTER TABLE `_ProductToPurceasedRequestedItem`
  ADD CONSTRAINT `_ProductToPurceasedRequestedItem_A_fkey` FOREIGN KEY (`A`) REFERENCES `Product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_ProductToPurceasedRequestedItem_B_fkey` FOREIGN KEY (`B`) REFERENCES `PurceasedRequestedItem` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `_ProductToPurchasedOrderItem`
--
ALTER TABLE `_ProductToPurchasedOrderItem`
  ADD CONSTRAINT `_ProductToPurchasedOrderItem_A_fkey` FOREIGN KEY (`A`) REFERENCES `Product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_ProductToPurchasedOrderItem_B_fkey` FOREIGN KEY (`B`) REFERENCES `PurchasedOrderItem` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `_PurceasedRequestedItemToPurchasedRequest`
--
ALTER TABLE `_PurceasedRequestedItemToPurchasedRequest`
  ADD CONSTRAINT `_PurceasedRequestedItemToPurchasedRequest_A_fkey` FOREIGN KEY (`A`) REFERENCES `PurceasedRequestedItem` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_PurceasedRequestedItemToPurchasedRequest_B_fkey` FOREIGN KEY (`B`) REFERENCES `PurchasedRequest` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `_PurchasedOrderToPurchasedOrderItem`
--
ALTER TABLE `_PurchasedOrderToPurchasedOrderItem`
  ADD CONSTRAINT `_PurchasedOrderToPurchasedOrderItem_A_fkey` FOREIGN KEY (`A`) REFERENCES `PurchasedOrder` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_PurchasedOrderToPurchasedOrderItem_B_fkey` FOREIGN KEY (`B`) REFERENCES `PurchasedOrderItem` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
