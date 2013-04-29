-- phpMyAdmin SQL Dump
-- version 3.5.7
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 29, 2013 at 11:20 AM
-- Server version: 5.5.27
-- PHP Version: 5.4.9

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `bookstore`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE IF NOT EXISTS `books` (
  `book_key` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `author` varchar(40) DEFAULT NULL,
  `year_published` int(11) DEFAULT NULL,
  `category` varchar(80) DEFAULT NULL,
  `num_copies` int(11) DEFAULT NULL,
  `price` decimal(5,2) DEFAULT NULL,
  `path_to_image` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`book_key`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=25 ;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`book_key`, `title`, `author`, `year_published`, `category`, `num_copies`, `price`, `path_to_image`) VALUES
(1, 'A Tale of Two Cities', 'Charles Dickens', 1859, 'Fiction', 5, '5.25', '../images/Tale_Two_Cities.jpg'),
(2, 'Adventures of Huckleberry Finn', 'Mark Twain', 1884, 'Fiction', 3, '6.25', '../images/Huck_Finn.jpg'),
(3, 'The Scarlett Letter', 'Nathaniel Hawthorne', 1850, 'Fiction', 4, '5.50', '../images/Scarlet_Letter.jpg'),
(4, 'Great Expectations', 'Charles Dickens', 1860, 'Fiction', 2, '8.50', '../images/Great_Expectations.jpg'),
(5, 'Moby Dick', 'Herman Melville', 1851, 'Fiction', 3, '6.50', '../images/Moby_Dick.jpg'),
(6, 'The Great Gatsby', 'F. Scott Fitzgerald', 1928, 'Fiction', 4, '7.50', '../images/Great_Gatsby.jpg'),
(7, 'The Art of The Deal', 'Donald Trump', 1987, 'Business', 4, '5.00', '../images/Art_Of_The_Deal.jpg'),
(8, 'Creating Wealth', 'Robert G. Allen', 2006, 'Business', 2, '5.50', '../images/Creating_Wealth.jpg'),
(9, 'How To Make Money in Stocks', 'William Oneil', 2010, 'Business', 3, '6.75', '../images/Make_Money_In_Stocks.jpg'),
(10, 'Thinking Like a Billionaire', 'Donald Trump', 2004, 'Business', 2, '10.00', '../images/Think_Like_A_Billionaire.jpg'),
(18, 'Let Me Tell You a Story', 'Red Aeurback', 2005, 'Sports', 3, '10.50', '../images/Tell_You_A_Story.jpg'),
(19, 'Muhammad Alis Greatest Fight', 'Howard Bingham', 2004, 'Sports', 2, '25.00', '../images/Ali_Greatest_Fight.jpg'),
(20, 'Drive The Story of My Life', 'Larry Bird', 1990, 'Sports', 2, '9.50', '../images/Drive_Larry_Bird.jpg'),
(21, 'A Season on the Brink', 'John Feinstein', 1989, 'Sports', 2, '9.50', '../images/Season_On_Brink.jpg'),
(22, 'Seabiscuit An American Legend', 'Laura Hillenbrand', 2002, 'Sports', 3, '12.00', '../images/Seabiscuit_Legend.jpg'),
(23, 'Rivals', 'Johnette Howard', 2005, 'Sports', 1, '10.00', '../images/Rivals.jpg'),
(24, 'The Boys of Summer', 'Roger Kahn', 2000, 'Sports', 2, '12.00', '../images/Boys_Of_Summer.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `bookstore_security`
--

CREATE TABLE IF NOT EXISTS `bookstore_security` (
  `security_key` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(80) NOT NULL,
  `password` varbinary(80) NOT NULL,
  `security_question` varchar(80) DEFAULT NULL,
  `security_answer` varchar(80) DEFAULT NULL,
  `customer_key` int(11) DEFAULT NULL,
  PRIMARY KEY (`security_key`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `bookstore_security`
--

INSERT INTO `bookstore_security` (`security_key`, `username`, `password`, `security_question`, `security_answer`, `customer_key`) VALUES
(2, 'DavidLBar', 'Eø\n¡}ômœñ:àndp', 'Mother_Maiden_Name', 'Wesson', 26),
(3, 'John', 'ŒŒÔ‚…œJÿÓVòƒ≤2º', 'Mother_Maiden_Name', 'Smith', 27);

-- --------------------------------------------------------

--
-- Table structure for table `book_categories`
--

CREATE TABLE IF NOT EXISTS `book_categories` (
  `book_category_key` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(80) NOT NULL,
  `category_description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`book_category_key`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `book_categories`
--

INSERT INTO `book_categories` (`book_category_key`, `category_name`, `category_description`) VALUES
(1, 'Fiction', 'A wide selection of fiction books available'),
(2, 'Sports', 'A wide selection of sports books available'),
(3, 'Business', 'A good selection of business and finance books available');

-- --------------------------------------------------------

--
-- Table structure for table `book_reviews`
--

CREATE TABLE IF NOT EXISTS `book_reviews` (
  `book_review_key` int(11) NOT NULL AUTO_INCREMENT,
  `book_key` int(11) NOT NULL,
  `customer_key` int(11) NOT NULL,
  `comments` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`book_review_key`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE IF NOT EXISTS `customers` (
  `customer_key` int(11) NOT NULL AUTO_INCREMENT,
  `security_key` int(11) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(40) NOT NULL,
  `address1` varchar(80) NOT NULL,
  `address2` varchar(80) DEFAULT NULL,
  `city` varchar(80) NOT NULL,
  `state` varchar(80) NOT NULL,
  `zipcode` varchar(10) NOT NULL,
  `email` varchar(80) NOT NULL,
  `general_interest` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`customer_key`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=28 ;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customer_key`, `security_key`, `first_name`, `last_name`, `address1`, `address2`, `city`, `state`, `zipcode`, `email`, `general_interest`) VALUES
(26, 2, 'David', 'Bardwell', '9 Saltonstall Parkway', 'Unit 2', 'Salem', 'MA', '01970', 'DavidLBar@aol.com', 'Fiction'),
(27, 3, 'John', 'Smith', '77 Locust St', '', 'Burlington', 'MA', '01970', 'Smity1001@aol.com', 'Business');

-- --------------------------------------------------------

--
-- Table structure for table `transaction_detail`
--

CREATE TABLE IF NOT EXISTS `transaction_detail` (
  `transaction_detail_key` int(11) NOT NULL AUTO_INCREMENT,
  `transaction_key` int(11) NOT NULL,
  `line_item` int(11) NOT NULL,
  `customer_key` int(11) NOT NULL,
  `book_key` int(11) NOT NULL,
  `amount` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`transaction_detail_key`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=70 ;

--
-- Dumping data for table `transaction_detail`
--

INSERT INTO `transaction_detail` (`transaction_detail_key`, `transaction_key`, `line_item`, `customer_key`, `book_key`, `amount`) VALUES
(63, 27, 1, 26, 2, '6.25'),
(64, 28, 1, 26, 7, '5.00'),
(65, 28, 2, 26, 10, '10.00'),
(66, 29, 1, 26, 8, '5.50'),
(67, 29, 2, 26, 9, '6.75'),
(68, 30, 1, 27, 7, '5.00'),
(69, 30, 2, 27, 10, '10.00');

-- --------------------------------------------------------

--
-- Table structure for table `transaction_summary`
--

CREATE TABLE IF NOT EXISTS `transaction_summary` (
  `transaction_key` int(11) NOT NULL AUTO_INCREMENT,
  `customer_key` int(11) NOT NULL,
  `purchase_date` date DEFAULT NULL,
  `amount` decimal(6,2) DEFAULT NULL,
  `payment_method` varchar(30) DEFAULT NULL,
  `delivery_method` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`transaction_key`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=31 ;

--
-- Dumping data for table `transaction_summary`
--

INSERT INTO `transaction_summary` (`transaction_key`, `customer_key`, `purchase_date`, `amount`, `payment_method`, `delivery_method`) VALUES
(27, 26, '2013-04-29', '6.25', 'Mastercard', 'Overnight'),
(28, 26, '2013-04-29', '15.00', 'Mastercard', 'Overnight'),
(29, 26, '2013-04-29', '12.25', 'Mastercard', 'Overnight'),
(30, 27, '2013-04-29', '15.00', 'Mastercard', 'Ground shipment');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
