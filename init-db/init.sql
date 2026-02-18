-- Create first database
CREATE DATABASE IF NOT EXISTS company_db;
USE company_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    full_name VARCHAR(10000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, email, full_name) VALUES
    ('alice_wonder', 'alice@company.com', 'Alice Wonderlandlakdh asdh ladla dhladh aldh aldh ldha ldashld ads hasdlh ldh lash dlsdha llakhsd lasdh ldasld hasdlk ahlkahas ldashdl akhsdlkashd aldha skldasfl hafs lasflksah lfsh asflh alfh akl fhasfl ahfs lsfhsa klf haflh asflhaskfl ashflals kfhalfh aslfh laf halfh alfh askfl halkfh lak ahsfl'),
    ('bob_builder', 'bob@company.com', 'Bob Builder'),
    ('charlie_brown', 'charlie@company.com', 'Charlie Brown'),
    ('diana_prince', 'diana@company.com', 'Diana Prince'),
    ('edward_stark', 'edward@company.com', 'Edward Stark');

-- Create second database
CREATE DATABASE IF NOT EXISTS shop_db;
USE shop_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    full_name VARCHAR(10000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, email, full_name) VALUES
    ('frank_ocean', 'frank@shop.com\nanothermail@mail.com', 'Frank Ocean'),
    ('grace_hopper', 'grace@shop.com', 'Grace Hopper'),
    ('henry_ford', 'henry@shop.com', 'Henry Ford'),
    ('iris_west', 'iris@shop.com', 'Iris West'),
    ('jack_sparrow', 'jack@shop.com', 'Jack Sparrow');
