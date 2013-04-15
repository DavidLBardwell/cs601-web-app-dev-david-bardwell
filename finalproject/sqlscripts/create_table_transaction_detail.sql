/* create the transaction detail table */
create table transaction_detail (
    transaction_detail_key INT PRIMARY KEY AUTO_INCREMENT,
    transaction_key INT NOT NULL,
    line_item INT NOT NULL,
    customer_key INT NOT NULL,
    book_key INT NOT NULL,
    amount DECIMAL(5, 2)
);
