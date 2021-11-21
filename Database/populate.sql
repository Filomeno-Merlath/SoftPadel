--medalhas
insert into medals (medal_type, medal_level) values('km','Cobre');
insert into medals (medal_type, medal_level) values('km','Prata');
insert into medals (medal_type, medal_level) values('km','Ouro');
insert into medals (medal_type, medal_level) values('km','Platina');
insert into medals (medal_type, medal_level) values('km','Diamante');

insert into medals (medal_type, medal_level) values('Diferentes campos visitados','Cobre');
insert into medals (medal_type, medal_level) values('Diferentes campos visitados','Prata');
insert into medals (medal_type, medal_level) values('Diferentes campos visitados','Ouro');
insert into medals (medal_type, medal_level) values('Diferentes campos visitados','Platina');
insert into medals (medal_type, medal_level) values('Diferentes campos visitados','Diamante');

insert into medals (medal_type, medal_level) values('Jogos Completados','Cobre');
insert into medals (medal_type, medal_level) values('Jogos Completados','Prata');
insert into medals (medal_type, medal_level) values('Jogos Completados','Ouro');
insert into medals (medal_type, medal_level) values('Jogos Completados','Platina');
insert into medals (medal_type, medal_level) values('Jogos Completados','Diamante');

insert into medals (medal_type, medal_level) values('Jogos ganhos','Cobre');
insert into medals (medal_type, medal_level) values('Jogos ganhos','Prata');
insert into medals (medal_type, medal_level) values('Jogos ganhos','Ouro');
insert into medals (medal_type, medal_level) values('Jogos ganhos','Platina');
insert into medals (medal_type, medal_level) values('Jogos ganhos','Diamante');

insert into cities(city_name) values('Lisboa');
insert into cities(city_name) values('Porto');
insert into cities(city_name) values('Braga');
insert into cities(city_name) values('Coimbra');
insert into cities(city_name) values('Aveiro');

--Fields
insert into fields(field_name, field_address, field_number, field_open, field_close, field_price_h, field_location, city_fk_id) values('Indoor Padel Center','R. Fernando Távora, 2790-045 Carnaxide','914440101','10:00:00','00:00:00','22','38.717897284215425, -9.221590915516517',1);
insert into fields(field_name, field_address, field_number, field_open, field_close, field_price_h, field_location, city_fk_id) values('Padel Campo Grande','Jardim do, 1700-090 Lisboa','211309260','09:00:00','00:00:00','20','38.75727286974241, -9.15316787130004',1);
insert into fields(field_name, field_address, field_number, field_open, field_close, field_price_h, field_location, city_fk_id) values('AEIST - Campos de Padel','Av. Rovisco Pais nº1, 1049-001 Lisboa','218419728','08:00:00','00:00:00','25','38.73753980481267, -9.13690996146956',1);
insert into fields(field_name, field_address, field_number, field_open, field_close, field_price_h, field_location, city_fk_id) values('Padel Benfica','R. Filipe da Mata, Lisboa','932347669','09:00:00','22:00:00','30','38.749528201254584, -9.204444437705915',1);
insert into fields(field_name, field_address, field_number, field_open, field_close, field_price_h, field_location, city_fk_id) values('Clube de Padel','Doca de Santo Amaro, 1350-353 Lisboa','210966443','09:00:00','22:00:00','30','38.70030651212528, -9.179243444505996',1);