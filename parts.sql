USE store;

DROP TABLE IF EXISTS parts;
create table parts(
	id int(5) auto_increment primary key,
    manufacturer_id int(5),
    component_type varchar(255),
    part_name varchar(255), 
    content varchar(255),
    price varchar(255),
    release_date datetime default now()
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

insert into parts (id, manufacturer_id, component_type, part_name, content, price)
values ('324', '10', 'CPU', 'INTEL Core i7 6700k', 'Old CPU that is outdated.', '150');

insert into parts (manufacturer_id, component_type, part_name, content, price)
values ('15', 'Case', 'Cooler Master MasterBox Q300L MicroATX Mini Tower Case', 'A great, small and cheap case with a tinted side panel and space for a large GPU.', '39.99');

insert into parts (manufacturer_id, component_type, part_name, content, price)
values ('10', 'CPU', 'INTEL Core i7 7700k', 'Old CPU that is outdated.', '160');

insert into parts (manufacturer_id, component_type, part_name, content, price)
values ('11', 'CPU', 'AMD Ryzen 9800', 'New CPU that is nice.', '300');

insert into parts (manufacturer_id, component_type, part_name, content, price)
values ('14', 'Case', 'Y70 Touch Infinite ATX Mid Tower Case', 'Digital Display.', '379.99');

insert into parts (manufacturer_id, component_type, part_name, content, price)
values ('12', 'GPU', 'GTX 980TI', 'Old but reliable graphics card', '150');

insert into parts (manufacturer_id, component_type, part_name, content, price)
values ('12', 'GPU', 'GTX 1080TI', 'Old but reliable graphics card', '200');

insert into parts (manufacturer_id, component_type, part_name, content, price)
values ('12', 'GPU', 'GTX 2080TI', 'Old but reliable graphics card', '200');

insert into parts (manufacturer_id, component_type, part_name, content, price)
values ('13', 'Case', 'H9 Flow ATX Mid Tower Case', 'Big case with good airflow.', '154.49');


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
values ('00001', 'Admin', 'TestPassword');

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