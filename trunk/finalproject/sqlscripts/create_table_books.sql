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
insert into books values (null, 'A Tale of Two Cities', 'Charles Dickens', 1859, 'Fiction', 5, 5.25, null);
insert into books values (null, 'Adventures of Huckleberry Finn', 'Mark Twain',  1884, 'Fiction', 3, 6.25, '../Huck_Finn.jpg');
insert into books values (null, 'The Scarlett Letter', 'Nathaniel Hawthorne', 1850, 'Fiction', 4, 5.50, null);
insert into books values (null, 'Great Expections', 'Charles Dickens', 1860, 'Fiction', 2, 8.50, null);
insert into books values (null, 'Moby Dick', 'Herman Melville', 1851, 'Fiction', 3, 6.50, null);

-- Business
insert into books values (null, 'The Art of The Deal', 'Donald Trump', 1987, 'Business', 4, 5.00, null);
insert into books values (null, 'Creating Wealth', 'Robert G. Allen', 2006, 'Business', 2, 5.50, null);
insert into books values (null, 'How To Make Money in Stocks', 'William Oneil', 2010, 'Business', 3, 6.75, null);
insert into books values (null, 'Thinking Like a Billionaire', 'Donald Trump', 2004, 'Business', 2, 10.00, null);

