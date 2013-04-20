/* create the transaction summary table */
create table transaction_summary (
    transaction_key INT PRIMARY KEY AUTO_INCREMENT,
    customer_key INT NOT NULL,
    purchase_date DATE,
    amount DECIMAL(6, 2),
    payment_method VARCHAR(30),
    delivery_method VARCHAR(30)
);
