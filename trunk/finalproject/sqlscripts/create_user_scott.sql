
-- create the scott/tiger user for database administration. Do not want to use root user.

CREATE USER 'scott'@'localhost' IDENTIFIED BY 'tiger';

grant all privileges on bookstore.* to 'scott'@'localhost';
