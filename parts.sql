USE store;

DROP TABLE IF EXISTS parts;
create table parts(
	id int(5) auto_increment primary key,
    manufacturer_id int(5),
    component_type varchar(255),
    part_name varchar(255), 
    content varchar(255),
    price varchar(255),
    release_date datetime default now(),
    img_url varchar(255)
);

DROP TABLE IF EXISTS manufacturer;
CREATE TABLE manufacturer(
	id int(5) primary key,
    brand varchar(255),
    headquarter_address varchar(255),
    phone_number varchar(255)
);

DROP TABLE IF EXISTS users;
create table users(
	id int(5) auto_increment primary key,
    user_password varchar(255),
    filters varchar(255),
    username varchar(255), 
    account_created datetime default now()
);

DROP TABLE IF EXISTS shopping_cart;
create table shopping_cart(
	id int(5) auto_increment primary key,
    products_selected varchar(255)
);

insert into parts (id, manufacturer_id, component_type, part_name, content, price, img_url)
values ('1', '10', 'CPU', 'INTEL Core i7 6700k', 'The 6th Generation Intel Core i7 processors deliver a new class of computing with a host of new features to power the next generation of desktops, laptops, and 2 in 1 PCs.', '85', '/images/6700k.png');

insert into parts (manufacturer_id, component_type, part_name, content, price, img_url)
values ('15', 'Case', 'Cooler Master MasterBox Q300L MicroATX Mini Tower Case', 'A great, small and cheap case with a tinted side panel and space for a large GPU.', '39.99', '/images/Q300L.jpg');

insert into parts (manufacturer_id, component_type, part_name, content, price, img_url)
values ('10', 'CPU', 'INTEL Core i7 7700k', 'Architected for performance, the Core i7-7700K processor packs 4 high-performing cores with core base frequency of 4.2GHz and 8MB of cache memory.', '229', '/images/7700k.png');

insert into parts (manufacturer_id, component_type, part_name, content, price, img_url)
values ('11', 'CPU', 'AMD Ryzen 9800', 'Harness the ultimate gaming edge with AMD Ryzen™ 7 9800 Processor. Enjoy faster gaming with 2nd gen AMD 3D V-Cache™ technology for low latency.', '479', '/images/ryzen9800.png');

insert into parts (manufacturer_id, component_type, part_name, content, price, img_url)
values ('14', 'Case', 'Y70 Touch Infinite ATX Mid Tower Case', 'Y70 is an upgraded dual chamber ATX mid tower modern aesthetic case that delivers next gen gaming experiences with massive 4 slot vertical graphics and unlocks maximum performance via ginormous cooling capacity.', '379.99', '/images/Y70ATX.jpg');

insert into parts (manufacturer_id, component_type, part_name, content, price, img_url)
values ('12', 'GPU', 'GTX 980TI', 'The GeForce GTX 980 Ti was a high-end graphics card by NVIDIA, Built on the 28 nm process, and based on the GM200 graphics processor, in its GM200-310-A1 variant, the card supports DirectX 12.', '150', '/images/980ti.png');

insert into parts (manufacturer_id, component_type, part_name, content, price, img_url)
values ('12', 'GPU', 'GTX 1080TI', 'The GeForce GTX 1080 Ti was an enthusiast-class graphics card by NVIDIA, Built on the 16 nm process, and based on the GP102 graphics processor.', '300', '/images/1080ti.png');

insert into parts (manufacturer_id, component_type, part_name, content, price, img_url)
values ('12', 'GPU', 'RTX 2080TI', 'Customers are satisfied with the video card\'s performance, build quality, speed, and cooling capacity. However, some feel the card is overpriced and have issues with noise level.', '800', '/images/2080ti.png');

insert into parts (manufacturer_id, component_type, part_name, content, price, img_url)
values ('13', 'Case', 'H9 Flow ATX Mid Tower Case', 'The H9 Flow is designed to cool off powerful GPUs with its expansive thermal capabilities, featuring the capacity for ten fans and numerous 360mm radiator mounting options and the perforated top panel takes cooling even further.', '154.49', '/images/H9Flow.png');

insert into parts (manufacturer_id, component_type, part_name, content, price, img_url)
values ('12', 'GPU', 'GTX 3080TI', 'The GeForce RTXTM 3080 Ti and RTX 3080 graphics cards deliver the performance that gamers crave, powered by Ampere—NVIDIA’s 2nd gen RTX architecture.', '950', '/images/3080ti.png');

insert into parts (manufacturer_id, component_type, part_name, content, price, img_url)
values ('12', 'GPU', 'GTX 4080TI', 'The GeForce RTX 4080 Ti is a graphics card by NVIDIA, Built on the 5 nm process, and based on the AD102 graphics processor.', '1250', '/images/4080.png');

insert into parts (manufacturer_id, component_type, part_name, content, price, img_url)
values ('10', 'CPU', 'INTEL Core i7 8700k', 'Customers find the computer processor offers good performance for gaming and general use. They appreciate its power, speed, and stability.', '164', '/images/8700k.png');

insert into parts (manufacturer_id, component_type, part_name, content, price, img_url)
values ('10', 'CPU', 'INTEL Core i7 9700k', 'Customers are satisfied with the computer processor\'s speed, performance, and value for money. They find it runs smoothly, performs well with gaming, and is a good upgrade for beginners.', '239', '/images/9700k.png');

insert into parts (manufacturer_id, component_type, part_name, content, price, img_url)
values ('10', 'CPU', 'INTEL Core i7 10700k', 'Customers find the computer processor offers decent performance and good value for money. They say it runs smoothly with 2080 graphics cards and adds some fps to games like Call of Duty and Control.', '248', '/images/10700k.png');

insert into parts (manufacturer_id, component_type, part_name, content, price, img_url)
values ('10', 'CPU', 'INTEL Core i7 11700k', 'These processors power high-end PCs with excellent CPU performance for discrete-level graphics - and AI acceleration.', '315', '/images/11700k.png');

insert into parts (manufacturer_id, component_type, part_name, content, price, img_url)
values ('10', 'CPU', 'INTEL Core i7 12700k', 'The CPU is powerful and fast enough for most tasks. Many consider it a good value for the price. Customers also appreciate its stability, ease of installation, and power consumption. However, opinions differ on the cooling.', '211', '/images/12700k.webp');

insert into parts (manufacturer_id, component_type, part_name, content, price, img_url)
values ('10', 'CPU', 'INTEL Core i7 13700k', 'Customers find the computer processor performs well in CPU-heavy games. They appreciate its smooth performance and consistent results. The processor is powerful and provides good value for money.', '419', '/images/13700k.webp');

insert into parts (manufacturer_id, component_type, part_name, content, price, img_url)
values ('11', 'CPU', 'AMD Ryzen 7600k', 'Customers find the computer processor offers good value for money, offering performance for both gaming and productivity tasks. It\'s easy to install and runs smoothly at high settings', '229', '/images/ryzen7600k.jpg');

insert into parts (manufacturer_id, component_type, part_name, content, price, img_url)
values ('11', 'CPU', 'AMD Ryzen 7800X3D', 'Customers are satisfied with the computer processor\'s gaming performance, value for money, speed, and functionality. They find it a powerful single-core and multi-threaded processor that runs smoothly.', '437', '/images/ryzen7800X3D.jpg');


/* Manufacturers */

insert into manufacturer (id, brand, headquarter_address, phone_number)
values ('15', 'Cooler Master', ' 8f No. 788-1 Zhongzheng Zhonghe District Rd, New Taipei City, Taipei, 23586, Taiwan', '(408) 486-2000');

insert into manufacturer (id, brand, headquarter_address, phone_number)
values ('10', 'Intel', '2200 Mission College Blvd Santa Clara, CA 95052', '(408) 765-8080');

insert into manufacturer (id, brand, headquarter_address, phone_number)
values ('13', 'NZXT', 'Inc. 605 E. Huntington Drive, Suite 213 Monrovia, CA 91016', '(626) 385-8272');

insert into manufacturer (id, brand, headquarter_address, phone_number)
values ('11', 'AMD', '2002-156th Avenue NE Bellevue, WA 98007', '(425) 586-6401');

insert into manufacturer (id, brand, headquarter_address, phone_number)
values ('12', 'NVidia', '2788 San Tomas Expressway Santa Clara, CA 95051', '(408) 486-2000');

insert into manufacturer (id, brand, headquarter_address)
values ('14', 'HYTE', '3824 Cedar Springs Road, Suite 430 Dallas, TX 75219');

/* users */
insert into users (id, username, user_password)
values ('1', 'Not Logged In', 'TestPassword1');

insert into users (username, user_password)
values ('Admin2', 'TestPassword2');

insert into users (username, user_password)
values ('Admin3', 'TestPassword3');

/* shoppingcarts */

insert into shopping_cart (id, products_selected)
values ('00001', '324, 325, 326');

insert into shopping_cart (products_selected)
values ('324, 325, 326');

insert into shopping_cart (products_selected)
values ('324, 325, 326');


SELECT * FROM parts;
SELECT * FROM manufacturer;
SELECT * FROM users;
Select * FROM shopping_cart;