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

insert into parts (id, manufacturer_id, component_type, part_name, content, price)
values ('324', '10', 'CPU', 'INTEL Core i7 6700k', 'Old CPU that is outdated.', '150');

insert into parts (manufacturer_id, component_type, part_name, content, price)
values ('10', 'CPU', 'INTEL Core i7 7700k', 'Old CPU that is outdated.', '160');

insert into parts (manufacturer_id, component_type, part_name, content, price)
values ('11', 'CPU', 'AMD Ryzen 9800', 'New CPU that is nice.', '300');

insert into manufacturer (id, brand, headquarter_address, phone_number)
values ('10', 'Intel', '2200 Mission College Blvd Santa Clara, CA 95052', '(408) 765-8080');

insert into manufacturer (id, brand, headquarter_address, phone_number)
values ('11', 'AMD', '2002-156th Avenue NE Bellevue, WA 98007', '(425) 586-6401');

SELECT * FROM parts;
SELECT * FROM manufacturer;