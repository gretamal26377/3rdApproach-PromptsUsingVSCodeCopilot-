CREATE DATABASE IF NOT EXISTS marketplace_db;
USE marketplace_db;

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    seller_id INT NOT NULL,
    role_id INT NOT NULL,
    user_name VARCHAR(50) NOT NULL,
    user_email VARCHAR(100) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    FOREIGN KEY (seller_id) REFERENCES sellers(seller_id),
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

CREATE TABLE IF NOT EXISTS sellers (
    seller_id INT AUTO_INCREMENT PRIMARY KEY,
    store_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_keyword VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS master_products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) UNIQUE NOT NULL,
    product_description TEXT,
    product_pic_path VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS products (
    product_id INT NOT NULL,
    seller_id INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    PRIMARY KEY (seller_id, product_id),
    FOREIGN KEY (seller_id) REFERENCES sellers(seller_id),
    FOREIGN KEY (product_id) REFERENCES master_products(product_id)
);

CREATE TABLE IF NOT EXISTS customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100) UNIQUE NOT NULL,
    customer_address TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    seller_id INT NOT NULL,
    order_tot_quantity INT NOT NULL,
    order_tot_price DECIMAL(10, 2) NOT NULL,
    order_status_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (seller_id) REFERENCES sellers(seller_id),
    FOREIGN KEY (order_status_id) REFERENCES order_statuses(status_id)
);

CREATE TABLE IF NOT EXISTS order_statuses (
    status_id INT AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(50) UNIQUE NOT NULL,
    status_keyword VARCHAR(50) UNIQUE NOT NULL,
    status_description TEXT
);

CREATE TABLE IF NOT EXISTS order_details (
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    PRIMARY KEY (order_id, product_id),
    product_quantity INT NOT NULL,
    product_tot_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

/* Not sure whether it's needed or not
CREATE TABLE IF NOT EXISTS seller_customer (
    seller_id INT NOT NULL,
    customer_id INT NOT NULL,
    PRIMARY KEY (seller_id, customer_id),
    FOREIGN KEY (seller_id) REFERENCES sellers(seller_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
); */

/* It's possible to create dummy data for testing purposes using the following SQL commands.
INSERT INTO roles (role_name, role_keyword) VALUES ('Admin', 'admin');*/