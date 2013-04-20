/* Create the customers table */
create table customers (
    customer_key INT PRIMARY KEY AUTO_INCREMENT,
    security_key INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    address1 VARCHAR(80) NOT NULL,
    address2 VARCHAR(80),
    city VARCHAR(80) NOT NULL,
    state VARCHAR(80) NOT NULL,
    zipcode VARCHAR(10) NOT NULL,
    email VARCHAR(80) NOT NULL,
    general_interest VARCHAR(40)
);

