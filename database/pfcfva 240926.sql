-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 26, 2024 at 03:32 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pfcfva`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_accounts`
--

CREATE TABLE `tbl_accounts` (
  `accountID` int(11) NOT NULL,
  `rfid` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `accountType` varchar(255) NOT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `middleName` varchar(255) DEFAULT NULL,
  `middleInitial` varchar(2) DEFAULT NULL,
  `callSign` varchar(255) DEFAULT NULL,
  `currentAddress` varchar(255) DEFAULT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `civilStatus` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `nationality` varchar(255) DEFAULT NULL,
  `bloodType` varchar(255) DEFAULT NULL,
  `mobileNumber` varchar(255) DEFAULT NULL,
  `emailAddress` varchar(255) DEFAULT NULL,
  `emergencyContactPerson` varchar(255) DEFAULT NULL,
  `emergencyContactNumber` varchar(255) DEFAULT NULL,
  `highestEducationalAttainment` varchar(255) DEFAULT NULL,
  `nameOfCompany` varchar(255) DEFAULT NULL,
  `yearsInService` varchar(255) DEFAULT NULL,
  `skillsTraining` varchar(255) DEFAULT NULL,
  `otherAffiliation` varchar(255) DEFAULT NULL,
  `idPicture` blob DEFAULT NULL,
  `bioDataChecked` tinyint(1) DEFAULT NULL,
  `interviewChecked` tinyint(1) DEFAULT NULL,
  `fireResponsePoints` int(11) DEFAULT NULL,
  `activityPoints` int(11) DEFAULT NULL,
  `inventoryPoints` int(11) DEFAULT NULL,
  `dutyHours` int(255) DEFAULT NULL,
  `cumulativeDutyHours` int(255) DEFAULT NULL,
  `rank` varchar(255) DEFAULT NULL,
  `resetPasswordToken` varchar(255) DEFAULT NULL,
  `resetPasswordExpires` bigint(20) DEFAULT NULL,
  `status` varchar(10) DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_accounts`
--

INSERT INTO `tbl_accounts` (`accountID`, `rfid`, `username`, `password`, `accountType`, `lastName`, `firstName`, `middleName`, `middleInitial`, `callSign`, `currentAddress`, `dateOfBirth`, `civilStatus`, `gender`, `nationality`, `bloodType`, `mobileNumber`, `emailAddress`, `emergencyContactPerson`, `emergencyContactNumber`, `highestEducationalAttainment`, `nameOfCompany`, `yearsInService`, `skillsTraining`, `otherAffiliation`, `idPicture`, `bioDataChecked`, `interviewChecked`, `fireResponsePoints`, `activityPoints`, `inventoryPoints`, `dutyHours`, `cumulativeDutyHours`, `rank`, `resetPasswordToken`, `resetPasswordExpires`, `status`) VALUES
(1, '0', 'admin', 'admin', 'Admin', 'admin', 'test', 'admin', 'a', 'echo', 'asdsada', '2024-05-09', 'asdasd', 'male', 'asdasd', 'A', '0912121', 'admin@gmail.com', 'asdasd', '121313', 'asdas', 'asda', '2', 'asd', 'asd', NULL, 0, 0, 2, 2, 2, 2, 0, NULL, NULL, NULL, 'Active'),
(2, '0', 'supervisor', 'supervisor', 'Supervisor', 'supervisor', 'ss', 'sss', 's', 'echo', 'sdasd asd a ', '2024-05-07', 'ssss', 'male', 'ss', 'A', '12131', 'supervisor@gmail.com', 'asdada ', '1231', 'ada', 'sada', '2', 'asda', 'sa', NULL, 1, 1, 33, 33, 33, 33, 0, NULL, NULL, NULL, 'Active'),
(3, '0', 'volunteer', 'volunteer', 'Volunteer', 'volunteer', 'asd', 'ssdw', 's', 'echo', 'asdasd', '2024-05-28', 's', 'male', 'asd', 'B', '123123', 'volunteer@gmail.com', 'asdsa', '12131', 'as', 'dsa', '3', 'asd', 'asd', NULL, 1, 0, 5, 5, 5, 5, 0, NULL, NULL, NULL, 'Active'),
(4, '0', 'aron', '123', 'Admin', 'aguirre', 'aron james', 'de la serna', 'd', 'echo', 'asdasd', '2024-05-23', 'sss', 'male', 'filipino', 'O-', '291821', 'aron@gmail.com', 'asda', '2311', 'asda', 'asdas', '3', 'asd', 'asd', NULL, 1, 1, 6, 3, 2, 5, 0, NULL, NULL, NULL, 'Active'),
(5, '0', 'test', 'test', 'Volunteer', 'Test', 'Test Test', 'Test', 'T', 'Aspirant', 'asdasd', '2014-06-10', 'single', 'female', 'filipino', 'A', '12141', 'test@gmail.com', 'asdasd', '12131', 'asd', 'asd', '2', 'asd', 'asd', NULL, 0, 0, 1, 1, 1, 1, 0, NULL, NULL, NULL, 'Active'),
(6, '0', 'admin1', '123', 'Admin', 'asda', 'asd', 'asd', 'a', 'asd', 'asdasd', '2024-05-04', 'asd', 'female', 'sad', 'A', '12131', 'admin@gmail.com', 'asda', '23131', 'asd', 'asd', '3', 'asd', 'a', NULL, 0, 0, 2, 2, 2, 2, 0, NULL, NULL, NULL, 'Active'),
(7, '0', 'admin2', '123', 'Admin', 'asd', 'asd', 'as', 'a', 'asd', 'asdasd', '2024-05-14', 'asd', 'male', 'asd', 'A', '12131', 'admin@gmail.com', 'asda', '1231', 'a', 'a', '1', 'a', 'a', NULL, 0, 0, 2, 2, 2, 2, 0, NULL, NULL, NULL, 'Active'),
(8, '0', 'v1', '$2b$10$mrYyAb5uwCR4kXAGKaTsZerDmAjwlWqbRxPBttdjQj4ajIDoELk2i', 'Volunteer', 'zzz', 'zzzz', 'zzz', 'z', 'zzz', 'asdasd', '2024-05-08', 'z', 'female', 'a', 'Z', '12131', 'v1@gmail.com', 'asda', '12131', 'asd', 'as', '1', 'as', 'as', NULL, 0, 0, 2, 2, 2, 2, 0, NULL, NULL, NULL, 'Active'),
(9, '0', 'admin123', '$2b$10$8v3aM.RhtxItWQqxBGMboOhgJOiqmalnUG1lEWkVc6A2F5XvDt7E2', 'Admin', 'min', 'ad', 'min', 'm', 'echoo', 'asdasd', '2024-05-17', 'f', 'male', 'f', 'A', '121313', 'admin@gmail.com', 'asdasd', '1213', '', '', '', '', '', NULL, 0, 0, 2, 2, 2, 2, 0, NULL, NULL, NULL, 'Active'),
(10, '0', 'supervisor1', '$2b$10$9GaXr.UDKBOfgzYdXHxOZebuP5PrvOCnraHlCae1FqGUUvGGMnmba', 'Supervisor', 'ssss', 'ss', 'ssss', 's', '1212', 'asdadad', '2019-06-18', 'asda', 'male', 'fil', 'A', '12131', '12131@gmail.com', 'sadasd', '12131', 'asd', 'sdf', '12123', '', '', NULL, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'Active'),
(11, '0', 'volunteer1', '$2b$10$22YJL.nNRbQgC89fm5mlieVq9rvn4Cn2KtTvZ1Z0tJif1aSJ7RRxq', 'Volunteer', 'volunteer', 'bvvv', 'vv', 'v', '2', 'asdas', '2023-11-29', 'vvv', 'male', 'vvv', 'V', '12113', 'asdad@gmail.com', 'asd', '12131', '', '', '2', '', '', NULL, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'Active'),
(12, '0', 'admin3', '$2b$10$3.zZ18aibYrbZn/TGvlCAOIR.TdgZCQMUHxeos6GgAFijQC.1fslO', 'Admin', 'asdasd', 'aaa', 'aaaa', 'a', 'Admin', 'sdfsdf', '2024-04-10', 'aaa', 'female', 'aaa', 'A', '12131', 'ad@gmail.com', 'sdfs', '231', '', '', '', '', '', NULL, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'Active'),
(13, '0', 'aaa', '$2b$10$Rj2Nogv5cwvwZIqS4RmHnuVmZZrpFbD08I/pBkgfR0ngad5AvE3oO', 'Volunteer', 'asda2', 'asd', 'as', 'a', 'ECHO800', 'asd', '2024-04-30', 'aaaa', 'male', 'a', 'A', '123', 'aa@gmail.com', 'asdad', '12', '', '', '', '', '', NULL, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'Active'),
(14, '0', 'fortest', '$2b$10$GfHPXgKgmbeJjlJ/Gd73ZekybcvzUNH8bS2WR.L6uUiUYEVXYQsf2', 'Admin', 'foasd', 'asda', 'asd', 'a', 'ASPIRANT', 'asdasdad', '2024-06-06', 'asd', 'male', 'asd', 'A', '121313', 'asda@gmail.com', 'asdasd', '23131', 'a', '', '', '', '', NULL, 1, 1, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'Active'),
(15, '123', 'rfidt', '$2b$10$zCd9g/LJQ7W2HzxiAKvey.c7UJG5Me7Wjx3OpymjxMvEURwXS8yLa', 'Supervisor', 'asd', 'asd', 'asdasd', 'a', 'PROBATIONARY', 'asdasd', '2024-06-04', 's', 'male', 'f', 'A', '231313', 'asds@gmail.com', 'asdsa', '1213', '', '', '', '', '', NULL, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'Active'),
(16, '8868079', 'vjames', '$2b$10$Y7nQaT0m9IfikX.awfkb/uP0WLxJqmtsBE5..vU4eGtdsx9zUuoSC', 'Volunteer', 'James', 'Aron', 'JJ', 'J', 'ECHO800', 'wsdrfsdf', '2024-06-05', 'S', 'male', 'F', 'B', '121313', 'vjames@gmail.com', 'sdfsd', '1213', '', '', '', '', '', NULL, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'Active'),
(17, '0008901708', 'varon', '$2b$10$YHAuvDfbO042zxHxKfkfqOkKVjEux76D5gvz/qTBkYzt4T2LnTq7.', 'Volunteer', 'aguirre', 'aron', 'aaaaa', 'a', 'PROBATIONARY', 'dasfsdf', '2024-06-05', 'asd', 'male', 'vv', 'V', '1213131', 'varon@gmail.com', 'sdffsd', '1213', '', '', '', '', '', NULL, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'Active'),
(18, '0008899291', 'undefined', '$2b$10$V3/0N7xJDHz4xsyoW7x/juDWWnNisIDVSErU4gp82buU.mN343NSW', 'Volunteer', 'aaaaaaaa', 'undefined', 'undefined', 'U', 'PROBATIONARY', 'asdasd', '0000-00-00', 'siungle', 'Female', 'fil', 'B', '121313', 'vjamex@gmail.com', 'asdasd', '121321', 'asd', 'sad', '2', 'asd', 'asd', NULL, 1, 1, 200, 300, 400, 100, 0, NULL, NULL, NULL, 'Active'),
(19, '12121', 'xdxd', '$2b$10$eGDZKRUDPU8o1jY5lCDDj./S6zptPj8zIUgPdSffYDrIZ9DrptVY2', 'Volunteer', 'asd', 'asd', 'asd', 'a', 'ASPIRANT', 'asdasd', '2024-06-30', 'asd', 'female', 'asd', 'x', '12131', 'asdasd@gmail.com', 'asda', '1212', '', '', '', '', '', NULL, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'Active'),
(20, '0008900670', '', '$2b$10$/b/UnrhWh.e8sU6LK9tzte8eNnlX40ChAdOBnojSPwky.F9d9M/Im', 'Volunteer', 'testerxxx', 'firstnm', 'midlenm', 'M', 'ECHO', 'asdasd2', '2024-06-09', 'single', '', 'filpino', 'A', '12143141', 'tester@gmail.com', 'asdasd', '12123', 'asd', 'sad', '3', 'asd', 'asdasd', NULL, 1, 1, 22, 33, 44, 11, 0, NULL, NULL, NULL, 'Active'),
(21, '1111', 'vvtest', '$2b$10$q05GNmfiyNWFt4cB5T3MbeDB1B.CPLfayai4eJELxr8GzeJ9Pa82S', 'Volunteer', 'lastnametest', 'twoa', 'twotwo', 'T', 'PROBATIONARY', 'asdasd', '2021-12-29', 'maried', 'Male', 'ff', 'F', '123', 'vgfte@gmail.com', 'asdasd', '12131313', 'asd', 'asd', '3', 'asd', 'sad', NULL, 1, 1, 22, 33, 44, 11, 0, NULL, NULL, NULL, 'Active'),
(22, '0009749187', 'agui', '$2b$10$r5IlhoG8nDUZ7R/fk7Mm8uVP6MzmEB/Mhgr7gdFUTwhdzI9MYRvSi', 'Volunteer', 'Aguirre', 'James', 'Delaserna', 'D', 'ASPIRANT', 'asds', '2024-06-11', 'Single', 'Male', 'Filipino', 'A', '1212', 'as@gmail.com', 'asd', '1213', 'asd', 'asd', '34345', 'sd', 'sdf', NULL, 0, 0, 22, 33, 44, 11, NULL, NULL, NULL, NULL, 'Active'),
(23, '0009760909', 'rfidtest', '$2b$10$WsMTPgyiHd5u2k58ByKxeez9AcdG1K1ouywGcSK0PR8QO1iNXrdS2', 'Supervisor', 'TestLN', 'TestFN', 'TestMN', 'T', 'ECHO', 'asda', '2022-01-06', 'signle', 'Female', 'fil', 'B', '12131', 'tes@gmail.com', 'asda', '121431', 'as', 'as', '3', '', '', NULL, 0, 0, 200, 300, 400, 100, NULL, NULL, NULL, NULL, 'Active'),
(24, '11', 'zzz', '$2b$10$fQkeh9CBKxxsiwFRhk5vhePJPz79BbxQfOCV144oWv2sZ0aIrr6S6', 'Volunteer', 'aa', 'a', 'zzz', 'z', 'PROBATIONARY', 'asd', '2024-07-01', 'Married', 'male', 'f', 'z', '12123', 'zz@gmail.com', 'sad', '112', 'Elementary Graduate', '', '', '', '', NULL, 0, 0, 2, 3, 4, 1, NULL, NULL, NULL, NULL, 'Active'),
(25, '222', 'xxx', '$2b$10$t/twdg24KIt54kGH99lvHe/.xL0ZVyDReGelANYMgpa3.9lf0Vo7a', 'Supervisor', 'aaaa', 'sss', 'ddd', 'd', 'ASPIRANT', 'asdas', '2024-06-18', 'Single', 'Male', 'f', 'z', '12131', 'xx@gmail.com', 'asd', '12', 'Elementary Graduate', '', '', '', '', NULL, 0, 0, 2, 2, 2, 2, NULL, NULL, NULL, NULL, 'Active'),
(26, '121213', 'fff', '$2b$10$R.744CnEg6rGOMT8gJlglu/5jJNjUwS.JKyBEzqvtM/dcuygQ/2sG', 'Volunteer', 'fff', 'ff', 'ff', 'f', 'PROBATIONARY', 'asdasd', '2024-06-30', 'Single', 'Male', 'ff', 'f', '1212', 'ff@gmail.com', 'asdasd', '1213', 'Junior High School Graduate', '', '', '', '', NULL, 0, 0, 2, 3, 4, 1, NULL, NULL, NULL, NULL, 'Active'),
(27, '1', 'xcxc', '$2b$10$NPwCN0owxNaOuDzqBvm0Eu1CNHz1lTmFHayidAaKIzKE1sXRt3OFy', 'Volunteer', 'aa', 'aa', 'sss', 's', 'PROBATIONARY', 'asd', '2024-07-01', 'Married', 'Male', 'f', 'z', '223', 'xc@gmail.com', 'asd', '11', 'Elementary Graduate', '', '', '', '', NULL, 0, 0, 1, 1, 1, 1, NULL, NULL, NULL, NULL, 'Active'),
(28, '12345', 'aron123', '$2b$10$YuC3BqCQvgE9F7Ek/fanR.lE7N.OVnB2kW1BZZs6lZTZ7wB/TPZyi', 'Volunteer', 'Aguirre', 'Aron james', 'delaserna', 'd', 'ASPIRANT', 'asd', '2006-07-04', 'Single', 'Male', 'Filipino', 'O-', '1234', 'ar.james.contact@gmail.com', 'asdas', '1213', 'Junior High School Graduate', '', '', '', '', NULL, 0, 0, 2, 3, 4, 1, NULL, NULL, 'ca0b7e66b1e3f676d122c4306b440ee209811306', 1721069846380, 'Active'),
(29, '9999', 'asdf', '$2b$10$aIRNZUlxxfnCbquH8Oh9IeZKDkkKOkQyVqdnZYvfuJhxCx9BnXwBO', 'Volunteer', 'Aaaaa', 'Aaa', 'Aaaaa', 'A', 'PROBATIONARY11', 'asdasd', '2006-07-03', 'Single', 'Male', 'American', 'A-', '12121', 'asd@gmail.com', 'Asd', '1212', 'Elementary Graduate', '', '', '', '', NULL, 0, 0, 1, 1, 1, 1, NULL, NULL, NULL, NULL, 'Active'),
(30, '12121212121212', 'vvv', '$2b$10$eN/kSfeW0VtUtxH525R/yuDclWacFUmuBoW2LAjpGXveq/ldKaQ1C', 'Admin', 'Asd', 'Asdasd', 'Asdasd', 'A', 'ECHO12', 'asdad', '2006-06-21', 'Single', 'Female', 'Filipino', 'A-', '12121', 'vv@gmail.com', 'Asd', '12', 'Elementary Graduate', '', '', '', '', NULL, 0, 0, 2, 3, 4, 1, NULL, NULL, NULL, NULL, 'Active'),
(32, '0008867969', '0008867969', '$2b$10$HgbYmJoZsczBSAF/7ag/pOL86.ef/wGSGBkCyqMeidy3p7pnHbtQa', 'Volunteer', 'Test', 'ABC', 'DEF', 'D', 'PROBATIONARY2', 'asdasd', '2006-09-04', 'Single', 'Male', 'Filipino', 'A-', '12113131', 'tes2222t@gmail.com', 'Asdasd', '3242', 'Junior High School Graduate', '', '', '', '', NULL, 0, 0, 2, 2, 2, 2, NULL, NULL, NULL, NULL, 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_attendance`
--

CREATE TABLE `tbl_attendance` (
  `attendanceID` int(11) NOT NULL,
  `accountID` int(11) NOT NULL,
  `timeIn` time DEFAULT NULL,
  `dateOfTimeIn` date DEFAULT NULL,
  `timeInStatus` tinyint(1) DEFAULT 0,
  `timeOut` time DEFAULT NULL,
  `dateOfTimeOut` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_attendance`
--

INSERT INTO `tbl_attendance` (`attendanceID`, `accountID`, `timeIn`, `dateOfTimeIn`, `timeInStatus`, `timeOut`, `dateOfTimeOut`) VALUES
(149, 23, '03:52:05', '2024-07-08', 0, '03:52:08', '2024-07-08'),
(150, 23, '03:52:18', '2024-07-08', 0, '03:52:34', '2024-07-08'),
(151, 22, '03:52:20', '2024-07-08', 0, '03:52:37', '2024-07-08'),
(152, 22, '03:54:00', '2024-07-08', 0, '03:57:40', '2024-07-08'),
(153, 23, '03:54:02', '2024-07-08', 0, '03:54:05', '2024-07-08'),
(154, 23, '03:57:36', '2024-07-08', 0, '03:57:45', '2024-07-08'),
(155, 22, '03:57:48', '2024-07-08', 0, '03:57:58', '2024-07-08'),
(156, 23, '03:58:00', '2024-07-08', 0, '04:03:58', '2024-07-08'),
(157, 22, '03:58:02', '2024-07-08', 0, '03:58:52', '2024-07-08'),
(158, 22, '03:58:53', '2024-07-08', 0, '03:58:55', '2024-07-08'),
(159, 22, '03:58:56', '2024-07-08', 0, '04:03:38', '2024-07-08'),
(160, 22, '04:03:43', '2024-07-08', 0, '04:03:49', '2024-07-08'),
(161, 22, '04:03:51', '2024-07-08', 0, '04:03:52', '2024-07-08'),
(162, 22, '04:03:53', '2024-07-08', 0, '04:03:54', '2024-07-08'),
(163, 22, '04:04:06', '2024-07-08', 0, '04:04:12', '2024-07-08'),
(164, 23, '04:04:09', '2024-07-08', 0, '04:04:14', '2024-07-08'),
(165, 23, '04:07:12', '2024-07-08', 0, '04:07:14', '2024-07-08'),
(166, 23, '04:07:18', '2024-07-08', 0, '04:07:23', '2024-07-08'),
(167, 22, '04:07:21', '2024-07-08', 0, '04:07:25', '2024-07-08'),
(168, 23, '04:08:15', '2024-07-08', 0, '04:08:17', '2024-07-08'),
(169, 23, '04:08:19', '2024-07-08', 0, '04:08:21', '2024-07-08'),
(170, 23, '04:08:23', '2024-07-08', 0, '04:08:33', '2024-07-08'),
(171, 22, '04:08:25', '2024-07-08', 0, '04:08:27', '2024-07-08'),
(172, 22, '04:08:29', '2024-07-08', 0, '04:08:30', '2024-07-08'),
(173, 23, '18:29:52', '2024-07-09', 0, '18:30:04', '2024-07-09'),
(174, 22, '18:29:56', '2024-07-09', 0, '18:30:07', '2024-07-09'),
(175, 22, '18:57:53', '2024-07-09', 0, '18:58:00', '2024-07-09'),
(176, 23, '18:57:58', '2024-07-09', 0, '18:58:04', '2024-07-09'),
(177, 22, '18:58:12', '2024-07-09', 0, '18:58:13', '2024-07-09'),
(178, 22, '18:58:20', '2024-07-09', 0, '18:58:21', '2024-07-09'),
(179, 22, '18:58:23', '2024-07-09', 0, '18:58:24', '2024-07-09'),
(180, 22, '18:59:32', '2024-07-09', 0, '19:02:55', '2024-07-09'),
(181, 22, '19:03:03', '2024-07-09', 0, '19:03:06', '2024-07-09'),
(182, 23, '19:03:11', '2024-07-09', 0, '19:03:13', '2024-07-09'),
(183, 22, '19:03:18', '2024-07-09', 0, '19:03:25', '2024-07-09'),
(184, 23, '19:03:22', '2024-07-09', 0, '19:03:27', '2024-07-09'),
(185, 23, '19:03:54', '2024-07-09', 0, '19:03:55', '2024-07-09'),
(186, 22, '19:03:57', '2024-07-09', 0, '19:03:59', '2024-07-09'),
(187, 23, '19:04:01', '2024-07-09', 0, '19:04:01', '2024-07-09'),
(188, 22, '19:04:03', '2024-07-09', 0, '19:04:03', '2024-07-09'),
(189, 23, '19:04:05', '2024-07-09', 0, '19:04:06', '2024-07-09'),
(190, 22, '19:04:53', '2024-07-09', 0, '19:04:56', '2024-07-09'),
(191, 23, '19:05:00', '2024-07-09', 0, '19:05:03', '2024-07-09'),
(192, 23, '19:05:06', '2024-07-09', 0, '19:05:08', '2024-07-09'),
(193, 23, '19:05:10', '2024-07-09', 0, '19:05:11', '2024-07-09'),
(194, 23, '19:05:11', '2024-07-09', 0, '19:05:12', '2024-07-09'),
(195, 23, '19:05:13', '2024-07-09', 0, '03:11:16', '2024-07-10'),
(196, 22, '19:05:15', '2024-07-09', 0, '19:05:16', '2024-07-09'),
(197, 22, '19:05:17', '2024-07-09', 0, '19:05:18', '2024-07-09'),
(198, 22, '03:11:10', '2024-07-10', 0, '03:11:13', '2024-07-10'),
(199, 23, '03:11:17', '2024-07-10', 0, '03:11:27', '2024-07-10'),
(200, 23, '03:11:29', '2024-07-10', 0, '03:11:31', '2024-07-10'),
(201, 23, '03:11:33', '2024-07-10', 0, '03:11:38', '2024-07-10'),
(202, 22, '03:11:36', '2024-07-10', 0, '03:11:40', '2024-07-10'),
(203, 22, '03:12:20', '2024-07-10', 0, '03:12:26', '2024-07-10'),
(204, 23, '03:12:23', '2024-07-10', 0, '03:12:24', '2024-07-10'),
(205, 22, '03:15:14', '2024-07-10', 0, '03:16:57', '2024-07-10'),
(206, 22, '03:16:58', '2024-07-10', 0, '03:16:59', '2024-07-10'),
(207, 22, '03:17:46', '2024-07-10', 0, '03:17:47', '2024-07-10'),
(208, 23, '03:18:49', '2024-07-10', 0, '03:18:54', '2024-07-10'),
(209, 23, '03:19:48', '2024-07-10', 0, '03:19:58', '2024-07-10'),
(210, 22, '03:19:54', '2024-07-10', 0, '03:20:02', '2024-07-10'),
(211, 22, '03:20:05', '2024-07-10', 0, '03:20:09', '2024-07-10'),
(212, 22, '03:20:12', '2024-07-10', 0, '03:20:14', '2024-07-10'),
(213, 22, '03:20:17', '2024-07-10', 0, '03:20:19', '2024-07-10'),
(214, 23, '10:35:58', '2024-07-16', 0, '10:36:11', '2024-07-16'),
(215, 22, '10:36:01', '2024-07-16', 0, '10:36:07', '2024-07-16'),
(216, 22, '10:44:25', '2024-07-16', 0, '10:44:27', '2024-07-16'),
(217, 23, '10:44:30', '2024-07-16', 0, '10:44:32', '2024-07-16'),
(218, 22, '10:44:35', '2024-07-16', 0, '10:44:37', '2024-07-16'),
(219, 22, '10:44:40', '2024-07-16', 0, '10:44:49', '2024-07-16'),
(220, 23, '10:44:43', '2024-07-16', 0, '10:44:45', '2024-07-16'),
(221, 22, '10:44:52', '2024-07-16', 0, '10:44:56', '2024-07-16'),
(222, 23, '10:44:54', '2024-07-16', 0, '10:44:59', '2024-07-16'),
(223, 22, '10:45:03', '2024-07-16', 0, '10:45:05', '2024-07-16'),
(224, 23, '10:45:09', '2024-07-16', 0, '10:45:11', '2024-07-16'),
(225, 23, '10:52:57', '2024-07-16', 0, '10:52:59', '2024-07-16'),
(226, 22, '10:53:02', '2024-07-16', 0, '10:53:03', '2024-07-16'),
(227, 22, '10:53:43', '2024-07-16', 0, '10:53:48', '2024-07-16'),
(228, 23, '10:53:45', '2024-07-16', 0, '10:53:52', '2024-07-16'),
(229, 22, '10:53:55', '2024-07-16', 0, '10:53:58', '2024-07-16'),
(230, 23, '10:54:02', '2024-07-16', 0, '10:54:05', '2024-07-16'),
(231, 23, '10:55:20', '2024-07-16', 0, '10:55:22', '2024-07-16'),
(232, 22, '10:55:24', '2024-07-16', 0, '10:55:25', '2024-07-16'),
(233, 23, '05:03:04', '2024-07-26', 0, '05:03:06', '2024-07-26'),
(234, 22, '05:03:32', '2024-07-26', 0, '05:03:35', '2024-07-26');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_fire_response_attendance`
--

CREATE TABLE `tbl_fire_response_attendance` (
  `fireResponseAttendanceID` int(11) NOT NULL,
  `attendanceID` int(11) NOT NULL,
  `accountID` int(11) NOT NULL,
  `onDuty` tinyint(1) DEFAULT NULL,
  `isPresent` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_fire_response_attendees`
--

CREATE TABLE `tbl_fire_response_attendees` (
  `fireResponseAttendeeID` int(11) NOT NULL,
  `attendanceID` int(11) NOT NULL,
  `accountID` int(11) NOT NULL,
  `isPending` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_fire_response_logs`
--

CREATE TABLE `tbl_fire_response_logs` (
  `fireResponseLogID` int(11) NOT NULL,
  `fireResponseAttendanceID` int(11) NOT NULL,
  `placeOfFire` varchar(255) DEFAULT NULL,
  `dateOfFireResponsOperation` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ics_logs`
--

CREATE TABLE `tbl_ics_logs` (
  `icsLogsID` int(11) NOT NULL,
  `accountID` int(11) NOT NULL,
  `fireResponseAttendanceID` int(11) NOT NULL,
  `commandReceived` varchar(255) DEFAULT NULL,
  `volunteerStatus` varchar(255) DEFAULT NULL,
  `remarks` longtext DEFAULT NULL,
  `dateAndTimeOfLog` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_inventory`
--

CREATE TABLE `tbl_inventory` (
  `itemID` int(11) NOT NULL,
  `itemName` varchar(255) DEFAULT NULL,
  `itemImage` varchar(255) DEFAULT NULL,
  `itemStatus` varchar(255) DEFAULT 'Available',
  `vehicleAssignment` varchar(255) DEFAULT NULL,
  `dateAcquired` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_inventory`
--

INSERT INTO `tbl_inventory` (`itemID`, `itemName`, `itemImage`, `itemStatus`, `vehicleAssignment`, `dateAcquired`) VALUES
(24, 'fire ex', '/uploads/itemImage-1724990876084.png', 'Available', 'Water Tender 72', '2024-08-21'),
(25, 'ff', '/uploads/itemImage-1726103413258.jpg', 'Available', 'Water Tender 72', '2024-09-18'),
(27, 'test11111', '/uploads/itemImage-1726104322278.png', 'Available', 'Pumper 72', '2024-09-11'),
(28, 'test111111', '/uploads/itemImage-1726107343252.png', 'Available', 'Engine 72', '2024-09-03'),
(29, 'asdzzz test', '/uploads/itemImage-1726109547608.png', 'Available', 'Engine 72', '2024-09-06'),
(30, 'compression test aaaazzzzzzzzzzaaa', '/uploads/itemImage-1726109578945.png', 'Available', 'Engine 72', '2024-09-04'),
(32, 'fffz', '/uploads/itemImage-1726177689151.png', 'Available', 'Engine 72', '2024-09-12'),
(33, 'fff1', '/uploads/itemImage-1726177711027.png', 'Available', 'Engine 72', '2024-09-12'),
(34, 'zzzz', '/uploads/itemImage-1726178528200.png', 'Available', 'Engine 72', '2024-09-18'),
(35, 'zzzzxxx', '/uploads/itemImage-1726178546211.png', 'Available', 'Engine 72', '2024-09-04'),
(36, 'ffff', '/uploads/itemImage-1726179262128.png', 'Available', 'Engine 72', '2024-09-05'),
(38, 'red tube', '/uploads/itemImage-1726920706084.png', 'Available', 'Engine 72', '2024-09-26'),
(39, 'test c', '/uploads/itemImage-1726921269194.png', 'Available', 'Engine 72', '2024-09-03'),
(40, 'zxc', '/uploads/itemImage-1726921340798.png', 'Available', 'Engine 72', '2024-09-11'),
(42, 'test2222', '/uploads/itemImage-1726923230911.png', 'Available', 'Pumper 72', '2024-09-04'),
(43, '2w', '/uploads/itemImage-1726923273752.png', 'Available', 'Engine 72', '2024-09-10'),
(44, 'ratio test', '/uploads/itemImage-1726923407945.png', 'Available', 'Engine 72', '2024-09-11');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_inventory_logs`
--

CREATE TABLE `tbl_inventory_logs` (
  `itemID` int(11) NOT NULL,
  `accountID` int(11) NOT NULL,
  `dateAndTimeChecked` datetime DEFAULT NULL,
  `itemStatusUpdates` varchar(255) DEFAULT NULL,
  `vehicleAssignmentUpdates` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ranks`
--

CREATE TABLE `tbl_ranks` (
  `rankName` varchar(255) NOT NULL,
  `callSign` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_ranks`
--

INSERT INTO `tbl_ranks` (`rankName`, `callSign`) VALUES
('ASPIRANT', ''),
('PROBATIONARY', ''),
('ECHO', ''),
('ECHO800', ''),
('ECHO900', ''),
('PREVO800', ''),
('PREVO900', ''),
('STAG', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_temp_users`
--

CREATE TABLE `tbl_temp_users` (
  `userID` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_temp_users`
--

INSERT INTO `tbl_temp_users` (`userID`, `username`, `password`) VALUES
(1, 'aron', '123'),
(2, 'test1', 'test1');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_vehicles`
--

CREATE TABLE `tbl_vehicles` (
  `vehicleName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_vehicles`
--

INSERT INTO `tbl_vehicles` (`vehicleName`) VALUES
('Pumper 72'),
('Water Tender 72'),
('Engine 72');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_accounts`
--
ALTER TABLE `tbl_accounts`
  ADD PRIMARY KEY (`accountID`);

--
-- Indexes for table `tbl_attendance`
--
ALTER TABLE `tbl_attendance`
  ADD PRIMARY KEY (`attendanceID`),
  ADD KEY `accountID` (`accountID`);

--
-- Indexes for table `tbl_fire_response_attendance`
--
ALTER TABLE `tbl_fire_response_attendance`
  ADD PRIMARY KEY (`fireResponseAttendanceID`),
  ADD KEY `attendanceID` (`attendanceID`),
  ADD KEY `accountID` (`accountID`);

--
-- Indexes for table `tbl_fire_response_attendees`
--
ALTER TABLE `tbl_fire_response_attendees`
  ADD PRIMARY KEY (`fireResponseAttendeeID`),
  ADD KEY `attendanceID` (`attendanceID`),
  ADD KEY `accountID` (`accountID`);

--
-- Indexes for table `tbl_fire_response_logs`
--
ALTER TABLE `tbl_fire_response_logs`
  ADD PRIMARY KEY (`fireResponseLogID`),
  ADD KEY `fireResponseAttendanceID` (`fireResponseAttendanceID`);

--
-- Indexes for table `tbl_ics_logs`
--
ALTER TABLE `tbl_ics_logs`
  ADD PRIMARY KEY (`icsLogsID`),
  ADD KEY `accountID` (`accountID`),
  ADD KEY `fireResponseAttendanceID` (`fireResponseAttendanceID`);

--
-- Indexes for table `tbl_inventory`
--
ALTER TABLE `tbl_inventory`
  ADD PRIMARY KEY (`itemID`);

--
-- Indexes for table `tbl_inventory_logs`
--
ALTER TABLE `tbl_inventory_logs`
  ADD KEY `itemID` (`itemID`),
  ADD KEY `accountID` (`accountID`);

--
-- Indexes for table `tbl_temp_users`
--
ALTER TABLE `tbl_temp_users`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_accounts`
--
ALTER TABLE `tbl_accounts`
  MODIFY `accountID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `tbl_attendance`
--
ALTER TABLE `tbl_attendance`
  MODIFY `attendanceID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=235;

--
-- AUTO_INCREMENT for table `tbl_fire_response_attendance`
--
ALTER TABLE `tbl_fire_response_attendance`
  MODIFY `fireResponseAttendanceID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_fire_response_attendees`
--
ALTER TABLE `tbl_fire_response_attendees`
  MODIFY `fireResponseAttendeeID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_fire_response_logs`
--
ALTER TABLE `tbl_fire_response_logs`
  MODIFY `fireResponseLogID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_ics_logs`
--
ALTER TABLE `tbl_ics_logs`
  MODIFY `icsLogsID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_inventory`
--
ALTER TABLE `tbl_inventory`
  MODIFY `itemID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `tbl_temp_users`
--
ALTER TABLE `tbl_temp_users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_attendance`
--
ALTER TABLE `tbl_attendance`
  ADD CONSTRAINT `tbl_attendance_ibfk_1` FOREIGN KEY (`accountID`) REFERENCES `tbl_accounts` (`accountID`);

--
-- Constraints for table `tbl_fire_response_attendance`
--
ALTER TABLE `tbl_fire_response_attendance`
  ADD CONSTRAINT `tbl_fire_response_attendance_ibfk_1` FOREIGN KEY (`attendanceID`) REFERENCES `tbl_attendance` (`attendanceID`),
  ADD CONSTRAINT `tbl_fire_response_attendance_ibfk_2` FOREIGN KEY (`accountID`) REFERENCES `tbl_accounts` (`accountID`);

--
-- Constraints for table `tbl_fire_response_attendees`
--
ALTER TABLE `tbl_fire_response_attendees`
  ADD CONSTRAINT `tbl_fire_response_attendees_ibfk_1` FOREIGN KEY (`attendanceID`) REFERENCES `tbl_attendance` (`attendanceID`),
  ADD CONSTRAINT `tbl_fire_response_attendees_ibfk_2` FOREIGN KEY (`accountID`) REFERENCES `tbl_accounts` (`accountID`);

--
-- Constraints for table `tbl_fire_response_logs`
--
ALTER TABLE `tbl_fire_response_logs`
  ADD CONSTRAINT `tbl_fire_response_logs_ibfk_1` FOREIGN KEY (`fireResponseAttendanceID`) REFERENCES `tbl_fire_response_attendance` (`fireResponseAttendanceID`);

--
-- Constraints for table `tbl_ics_logs`
--
ALTER TABLE `tbl_ics_logs`
  ADD CONSTRAINT `tbl_ics_logs_ibfk_1` FOREIGN KEY (`accountID`) REFERENCES `tbl_accounts` (`accountID`),
  ADD CONSTRAINT `tbl_ics_logs_ibfk_2` FOREIGN KEY (`fireResponseAttendanceID`) REFERENCES `tbl_fire_response_attendance` (`fireResponseAttendanceID`);

--
-- Constraints for table `tbl_inventory_logs`
--
ALTER TABLE `tbl_inventory_logs`
  ADD CONSTRAINT `tbl_inventory_logs_ibfk_1` FOREIGN KEY (`itemID`) REFERENCES `tbl_inventory` (`itemID`),
  ADD CONSTRAINT `tbl_inventory_logs_ibfk_2` FOREIGN KEY (`accountID`) REFERENCES `tbl_accounts` (`accountID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
