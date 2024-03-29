/* Create the book table and load some records */
create table books (
    book_key INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200),
    author VARCHAR(40),
    year_published INT,
    category VARCHAR(80),   -- to do: make this a foreign key to category table
    num_copies INT,
    price DECIMAL(5,2),
    path_to_image VARCHAR(80)
);

-- insert all the book data
-- Fiction
insert into books values (null, 'A Tale of Two Cities', 'Charles Dickens', 1859, 'Fiction', 5, 5.25, '../images/Tale_Two_Cities.jpg');
insert into books values (null, 'Adventures of Huckleberry Finn', 'Mark Twain',  1884, 'Fiction', 3, 6.25, '../images/Huck_Finn.jpg');
insert into books values (null, 'The Scarlett Letter', 'Nathaniel Hawthorne', 1850, 'Fiction', 4, 5.50, '../images/Scarlet_Letter.jpg');
insert into books values (null, 'Great Expectations', 'Charles Dickens', 1860, 'Fiction', 2, 8.50, '../images/Great_Expectations.jpg');
insert into books values (null, 'Moby Dick', 'Herman Melville', 1851, 'Fiction', 3, 6.50, '../images/Moby_Dick.jpg');
insert into books values (null, 'The Great Gatsby', 'F. Scott Fitzgerald', 1928, 'Fiction', 4, 7.50, '../images/Great_Gatsby.jpg');

-- Business
insert into books values (null, 'The Art of The Deal', 'Donald Trump', 1987, 'Business', 4, 5.00, '../images/Art_Of_The_Deal.jpg');
insert into books values (null, 'Creating Wealth', 'Robert G. Allen', 2006, 'Business', 2, 5.50, '../images/Creating_Wealth.jpg');
insert into books values (null, 'How To Make Money in Stocks', 'William Oneil', 2010, 'Business', 3, 6.75, '../images/Make_Money_In_Stocks.jpg');
insert into books values (null, 'Thinking Like a Billionaire', 'Donald Trump', 2004, 'Business', 2, 10.00, '../images/Think_Like_A_Billionaire.jpg');

-- Sports
insert into books values (null, 'Let Me Tell You a Story', 'Red Aeurback', 2005, 'Sports', 3, 10.50, '../images/Tell_You_A_Story.jpg');
insert into books values (null, 'Muhammad Alis Greatest Fight', 'Howard Bingham', 2004, 'Sports', 2, 25.00, '../images/Ali_Greatest_Fight.jpg');
insert into books values (null, 'Drive The Story of My Life', 'Larry Bird', 1990, 'Sports', 2, 9.50,  '../images/Drive_Larry_Bird.jpg');
insert into books values (null, 'A Season on the Brink', 'John Feinstein', 1989, 'Sports', 2, 9.50, '../images/Season_On_Brink.jpg');
insert into books values (null, 'Seabiscuit An American Legend', 'Laura Hillenbrand', 2002, 'Sports', 3, 12.00, '../images/Seabiscuit_Legend.jpg');
insert into books values (null, 'Rivals', 'Johnette Howard', 2005, 'Sports', 1, 10.00, '../images/Rivals.jpg'); 
insert into books values (null, 'The Boys of Summer', 'Roger Kahn', 2000, 'Sports', 2, 12.00, '../images/Boys_Of_Summer.jpg');
