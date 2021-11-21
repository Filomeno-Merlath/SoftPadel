create table cities(
	city_id serial,
	city_name varchar(15) not null,
	primary key (city_id)
);

create table ugroups(
    ugroup_id serial,
	ugroup_name varchar(15) not null,
	primary key (ugroup_id)
);
create table users_groups(
    user_group_id serial,
	user_fk_id int not null,
	group_fk_id int not null,
	primary key (user_group_id),
	foreign key(user_fk_id) references users(user_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
	foreign key(group_fk_id ) references ugroups(ugroup_id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

create table medals(
	medal_id serial,
	medal_type varchar(30),
	medal_level varchar(10),
	primary key (medal_id)
);

create table fields(
	field_id serial,
	field_name varchar(30)not null,
	field_address varchar(200) not null,
	field_number int not null,
	field_open time not null,
	field_close time not null,
	field_price_h int not null,
	field_location point not null,
	city_fk_id int,
	primary key (field_id),
	foreign key (city_fk_id) references cities(city_id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

create table users(
	user_id serial,
	user_firstname varchar(20) not null,
	user_lastname varchar(20) not null,
	user_username varchar(15) not null unique,
	user_email varchar(35) not null unique,
	user_password varchar(70) not null,
	user_bdate date not null,
	user_gender char(1) not null,
	user_address varchar(50) not null,
	user_location point,
	city_fk_id int,
	primary key (user_id),
	foreign key (city_fk_id) references cities(city_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
);

create table users_friends(
	user_friend_id serial,
	user1_fk_id int,
	user2_fk_id int,
	user_friends_estate int,-- (0,1,2)(processar,aceite,rejeitado)
	primary key(user_friend_id),
	foreign key (user1_fk_id) references users(user_id) on delete no action on update no action,
	foreign key (user2_fk_id) references users(user_id) on delete no action on update no action
);

create table users_medals(
	medal_user_id serial,
	user_fK_id int not null,
	medal_fk_id int not null,
	primary key (medal_user_id),
	foreign key (user_fk_id) references users(user_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
	foreign key (medal_fk_id) references medals(medal_id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

create table reserve(
	reserve_id serial,
	reserve_date date not null,
	reserve_estate int not null,
	user_fk_id int not null,
	field_fk_id int not null,
	primary Key (reserve_id),
	foreign key (user_fk_id) references users(user_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
	foreign key (field_fk_id) references fields(field_id) ON DELETE NO ACTION ON UPDATE NO ACTION
);
create table trips(
	trip_id serial,
	primary key (trip_id)                                                                                         
);
