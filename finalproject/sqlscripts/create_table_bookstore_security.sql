/* create the security table which will hold username and password information */
create table bookstore_security (
    security_key INT PRIMARY KEY AUTO_INCREMENT,
    username varchar(30) NOT NULL,
    password varchar(30) NOT NULL,
    customer_key INT
);

