-- phpMyAdmin SQL Dump
-- version 3.5.7
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 29, 2013 at 02:02 AM
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
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `security_question` varchar(80) DEFAULT NULL,
  `security_answer` varchar(80) DEFAULT NULL,
  `customer_key` int(11) DEFAULT NULL,
  PRIMARY KEY (`security_key`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=25 ;

--
-- Dumping data for table `bookstore_security`
--

INSERT INTO `bookstore_security` (`security_key`, `username`, `password`, `security_question`, `security_answer`, `customer_key`) VALUES
(22, 'DavidLBar', 'supernova300', 'City_Born', 'Cincinnati', 21),
(23, 'John', 'smith100', 'City_Born', 'Boston', 22),
(24, 'John', 'denver100', 'Mother_Maiden_Name', 'Denver', 23);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customer_key`, `security_key`, `first_name`, `last_name`, `address1`, `address2`, `city`, `state`, `zipcode`, `email`, `general_interest`) VALUES
(21, 22, 'David', 'Bardwell', '9 Saltonstall Parkway', 'Unit 2', 'Salem', 'MA', '01970', 'DavidLBar@aol.com', 'Fiction'),
(22, 23, 'John', 'Smith', '100 Main Street', '', 'Burlington', 'MA', '01803', 'JSmith100@aol.com', 'Business'),
(23, 24, 'John', 'Denver', '333 Cross St', '', 'Denver', 'Colorado', '84994', 'JD@argo2.net', 'Sports');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=63 ;

--
-- Dumping data for table `transaction_detail`
--

INSERT INTO `transaction_detail` (`transaction_detail_key`, `transaction_key`, `line_item`, `customer_key`, `book_key`, `amount`) VALUES
(41, 19, 1, 21, 4, '8.50'),
(42, 19, 2, 21, 6, '7.50'),
(43, 20, 1, 21, 1, '5.25'),
(44, 20, 2, 21, 2, '6.25'),
(45, 21, 1, 21, 1, '5.25'),
(46, 21, 2, 21, 2, '6.25'),
(47, 21, 3, 21, 4, '8.50'),
(48, 22, 1, 21, 8, '5.50'),
(49, 22, 2, 21, 10, '10.00'),
(50, 22, 3, 21, 1, '5.25'),
(51, 23, 1, 22, 9, '6.75'),
(52, 23, 2, 22, 7, '5.00'),
(53, 24, 1, 21, 1, '5.25'),
(54, 24, 2, 21, 2, '6.25'),
(55, 25, 1, 21, 21, '9.50'),
(56, 25, 2, 21, 20, '9.50'),
(57, 25, 3, 21, 18, '10.50'),
(58, 25, 4, 21, 19, '25.00'),
(59, 25, 5, 21, 23, '10.00'),
(60, 25, 6, 21, 22, '12.00'),
(61, 25, 7, 21, 24, '12.00'),
(62, 26, 1, 23, 21, '9.50');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=27 ;

--
-- Dumping data for table `transaction_summary`
--

INSERT INTO `transaction_summary` (`transaction_key`, `customer_key`, `purchase_date`, `amount`, `payment_method`, `delivery_method`) VALUES
(19, 21, '2013-04-28', '16.00', 'Mastercard', 'Ground shipment'),
(20, 21, '2013-04-28', '11.50', 'Mastercard', 'Ground shipment'),
(21, 21, '2013-04-28', '20.00', 'Mastercard', '2nd Day Air'),
(22, 21, '2013-04-28', '20.75', 'Mastercard', 'Overnight'),
(23, 22, '2013-04-28', '11.75', 'Mastercard', 'Overnight'),
(24, 21, '2013-04-28', '11.50', 'Mastercard', 'Overnight'),
(25, 21, '2013-04-29', '88.50', 'Mastercard', 'Overnight'),
(26, 23, '2013-04-29', '9.50', 'Mastercard', 'Overnight');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
