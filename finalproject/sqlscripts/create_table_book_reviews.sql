/* create the book_reviews table to store book review comments from customers */
create table book_reviews (
    book_review_key INT PRIMARY KEY AUTO_INCREMENT,
    book_key INT NOT NULL,
    customer_key INT NOT NULL,
    comments VARCHAR(512)
);
