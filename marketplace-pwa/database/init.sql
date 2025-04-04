CREATE DATABASE IF NOT EXISTS marketplace;
USE marketplace;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    seller_id INT NOT NULL,
    role_id INT NOT NULL,
    user_name VARCHAR(50) NOT NULL,
    user_email VARCHAR(100) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    FOREIGN KEY (seller_id) REFERENCES sellers(seller_id),
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

CREATE TABLE sellers (
    seller_id INT AUTO_INCREMENT PRIMARY KEY,
    store_name VARCHAR(100) NOT NULL
);

CREATE TABLE roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_keyword VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE master_products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) UNIQUE NOT NULL,
    product_description TEXT,
    product_pic_path VARCHAR(255)
);

CREATE TABLE products (
    product_id INT NOT NULL,
    seller_id INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    PRIMARY KEY (product_id, seller_id),
    FOREIGN KEY (seller_id) REFERENCES sellers(seller_id),
    FOREIGN KEY (product_id) REFERENCES master_products(product_id)
);

CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100) UNIQUE NOT NULL,
    customer_address TEXT NOT NULL
);

CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    seller_id INT NOT NULL,
    order_tot_quantity INT NOT NULL,
    order_tot_price DECIMAL(10, 2) NOT NULL,
    order_status VARCHAR(50) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (seller_id) REFERENCES sellers(seller_id)
);

CREATE TABLE order_details (
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    PRIMARY KEY (order_id, product_id),
    product_quantity INT NOT NULL,
    product_tot_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

/* Not sure whether it's needed or not
CREATE TABLE seller_customer (
    seller_id INT NOT NULL,
    customer_id INT NOT NULL,
    PRIMARY KEY (seller_id, customer_id),
    FOREIGN KEY (seller_id) REFERENCES sellers(seller_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
); */

/* It's possible to create dummy data for testing purposes using the following SQL commands.
INSERT INTO roles (role_name, role_keyword) VALUES ('Admin', 'admin');*/