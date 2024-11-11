-- eshop database

create database eshop;
use eshop;

create table category 
(
    cid int auto_increment,
    name varchar(100) not null unique,  
    description varchar(2000),
    image blob,   
    image_filename varchar(255),
    constraint pk_category primary key(cid)  

);

create table product
(
    pid int auto_increment,
    cid int not null,
    name varchar(100),
    description varchar(2000) comment 'description of product',
    unit_price numeric(8,2) not null,
    constraint pk_product primary key(pid),
    constraint fk_product_category foreign key(cid) references category(cid)
    on update cascade on delete restrict 
);

create table product_image
(
    iid int auto_increment,
    pid int not null,
    image blob,
    constraint pk_product_image primary key(iid),
    constraint fk_product_prod_image foreign key(pid) references product(pid)
    on update cascade on delete restrict
);

create table orders
(
    oid int auto_increment,
    cid int not null,
    _date date,
    status varchar(1000),
    constraint pk_order primary key(oid),
    constraint fk_order_category foreign key(cid) references category(cid)
    on update cascade on delete restrict
);

create table order_detail
(
    oid int not null,
    pid int not null,
    qty int,
    unit_price numeric(9,2),
    constraint fk_order_detail_order foreign key(oid) references orders(oid),
    constraint fk_order_detail_product foreign key(pid) references product(pid)
    on update cascade on delete restrict
);

create table customer
(
    cid int auto_increment,
    login varchar(20),
    pwd varchar(20),
    name varchar(50),
    phone varchar(12),
    address varchar(300),
    constraint pk_customer primary key(cid)
);

create table cart
(
    session_id varchar(50),
    pid int not null,
    qty int,
    constraint fk_customer_cart foreign key(pid) references product(pid)
    on update cascade on delete restrict
);

create table users
(
    uid int auto_increment,
    username varchar(30),
    pwd varchar(30),
    constraint pk_user primary key(uid)

);




