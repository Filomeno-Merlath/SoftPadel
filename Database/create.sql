create table cities(
	city_id serial,
	city_name varchar(15) not null,
	primary key (city_id)
);

create table player_groups(
    player_group_id serial,
	player_group_name varchar(10) not null,
	primary key (player_group_id)
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
	field_adress varchar(50) not null,
	field_number int not null,
	field_open time not null,
	field_close time not null,
	field_price_h int not null,
	city_fk_id int,
	primary key (field_id),
	foreign key (city_fk_id) references cities(city_id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

create table players(
	player_id serial,
	player_firstname varchar(20) not null,
	player_lastname varchar(20) not null,
	player_username varchar(15) not null,
	player_email varchar(35) not null,
	player_password varchar(70) not null,
	player_bdate date not null,
	player_gender char(1) not null,
	player_address varchar(50) not null,
	--player_lat float not null,
	--player_long float not null,
	city_fk_id int,
	player_group_fk_id int,
	primary key (player_id),
	foreign key (player_group_fk_id) references player_groups(player_group_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
	foreign key (city_fk_id) references cities(city_id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

create table player_friends(
	player_friends_id serial,
	player1_fk_id int,
	player2_fk_id int,
	primary key(player_friends_id),
	foreign key (player1_fk_id) references players(player_id) on delete no action on update no action,
	foreign key (player2_fk_id) references players(player_id) on delete no action on update no action
);

create table players_medals(
	medal_player_id serial,
	player_fK_id int not null,
	medal_fk_id int not null,
	primary key (medal_player_id),
	foreign key (player_fk_id) references players(player_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
	foreign key (medal_fk_id) references medals(medal_id) ON DELETE NO ACTION ON UPDATE NO ACTION
);





