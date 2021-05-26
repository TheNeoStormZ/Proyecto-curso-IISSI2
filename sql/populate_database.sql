INSERT INTO Users
VALUES
	(1, 'John', 'Doe',null, 'john.doe@gallery.com', 'john', 'pbkdf2:sha256:150000$KKgd0xN5$d778b27800d8b89e001843285475a0da3f6f6c664ec8e8a9590ed1c49603b194', '/images/default_profile.png'),
	(2, 'Jane', 'Smith',null, 'jane.smith@gallery.com', 'jane', 'pbkdf2:sha256:150000$v4wgnaXC$b87f5daf437119c21ec712462f4b193b6fada27f485e36502c5cf4553a01f640', '/images/default_profile.png'),
	(3, 'Laura', 'Acosta', '', 'lacosta@gmail.com', 'lacosta', 'pbkdf2:sha256:150000$FCWbm0zS$be6a7d2f6d0ffacaee15f62172579c58aeef0d3bde9534ca24a8de2c9d6c8d39', 'http://cdn.onlinewebfonts.com/svg/img_62898.png');
-- Password = username

INSERT INTO Photos
VALUES
	(1, 'Tortilla', 'A typical Spanish tortilla. With onion, of course.', '2012-05-12 18:25:43', 'https://cdn1.cocina-familiar.com/recetas/thumb/tortilla-de-patata-con-cebolla.jpg', 'Public', 1),
	(2, 'Samoyed', 'A very fluffy dog', '2020-01-12 13:37:01', 'https://www.dogsnsw.org.au/media/img/BrowseAllBreed/Samoyed-.jpg', 'Public', 2),
	(3, 'Sleepy cat', 'A drawing of a cat about to sleep', '2019-08-24 21:20:21', 'https://pbs.twimg.com/media/EZ4Z2QDUYAANA-Z?format=png', 'Public', 1),
	(4, 'Seville', 'The beautiful city of Seville, Spain', '2016-04-02 09:16:58', 'https://urbansevilla.es/wp-content/uploads/2019/03/urban-sevilla-foto-ciudad.jpg', 'Public', 2),
	(5, 'The Outer Space', 'So beautiful', '2021-05-23 17:41:30', 'http://s1.picswalls.com/wallpapers/2014/02/19/space_110931862_30.jpg', 'Public', 3);

-- Add some more data for your other tables...

INSERT INTO `ratings` (`ratingId`, `photoId`, `userId`, `ratingValue`) VALUES
	(1, 4, 1, 5),
	(2, 3, 2, 2),
	(3, 4, 2, 5),
	(4, 3, 3, 5),
	(5, 2, 3, 4),
	(6, 5, 3, 5),
	(7, 5, 2, 3),
	(8, 5, 1, 3);

	INSERT INTO `inapropiatewords` (`inapropiateWordId`, `wordValue`) VALUES
	(1, 'shrekphone');

	INSERT INTO `category` (`categoryId`, `categoryName`) VALUES
	(1, 'Animales'),
	(2, 'Paisajes'),
	(3, 'Tecnologia');

