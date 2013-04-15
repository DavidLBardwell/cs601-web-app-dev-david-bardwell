/* create the book categories table for organizing our bookstore .
   This ties into general interest like Fiction, Sports, business, etc. */
   
create table book_categories (
    book_category_key INT PRIMARY KEY AUTO_INCREMENT,
    category_name varchar(80) NOT NULL,
    category_description varchar(200)
);

insert into book_categories values(null, 'Fiction', 'A wide selection of fiction books available');
insert into book_categories values(null, 'Sports', 'A wide selection of sports books available');
insert into book_categories values(null, 'Business', 'A good selection of business and finance books available');
-- to do add more categories
