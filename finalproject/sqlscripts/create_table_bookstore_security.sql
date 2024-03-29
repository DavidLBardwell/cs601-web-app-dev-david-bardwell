/* create the security table which will hold username and password information */
create table bookstore_security (
    security_key INT PRIMARY KEY AUTO_INCREMENT,
    username varchar(80) NOT NULL,
    password varbinary(80) NOT NULL,
    security_question varchar(80),
    security_answer varchar(80),
    customer_key INT
);
