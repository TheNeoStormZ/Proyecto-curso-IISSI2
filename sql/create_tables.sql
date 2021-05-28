DROP TABLE IF EXISTS Photos;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
	userId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	firstName VARCHAR(128) NOT NULL CHECK (firstName <> '') ,
	lastName VARCHAR(128) NOT NULL CHECK (lastName <> ''),
	secondSurname VARCHAR(128),
	email VARCHAR(128) NOT NULL UNIQUE CHECK (email <> ''),
	username VARCHAR(64) UNIQUE NOT NULL CHECK (username <> ''),
	password VARCHAR(256) NOT NULL CHECK (password <> ''),
	avatarUrl VARCHAR(512),

	CONSTRAINT UniqueAcoount UNIQUE(username,email)
);

CREATE TABLE Photos (
	photoId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(128) NOT NULL CHECK (title <> ''),
	description VARCHAR(512),
	date DATETIME DEFAULT CURRENT_TIMESTAMP,
	url VARCHAR(512) NOT NULL CHECK (url <> ''),
	visibility VARCHAR(16) NOT NULL  CHECK (visibility <> ''),
	userId INT NOT NULL,
	FOREIGN KEY (userId) REFERENCES Users (userId),
	CONSTRAINT ValidVisibility CHECK (visibility in ('Public', 'Private','Friends'))
);

CREATE TABLE Ratings (
	ratingId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	photoId INT NOT NULL,
	userId INT NOT NULL,
	ratingValue INT NOT NULL,
	FOREIGN KEY (userId) REFERENCES Users (userId) ON DELETE CASCADE,
	FOREIGN KEY (photoId) REFERENCES Photos (photoId) ON DELETE CASCADE,
	CONSTRAINT ValidRate CHECK (ratingValue BETWEEN 1 AND 5),
	CONSTRAINT UniqueRating UNIQUE(photoId,userId)
);

CREATE TABLE Comments (
	commentId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	photoId INT NOT NULL,
	userId INT NOT NULL,
	commentText VARCHAR(512),
	date DATETIME DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (userId) REFERENCES Users (userId) ON DELETE CASCADE,
	FOREIGN KEY (photoId) REFERENCES Photos (photoId)
);

CREATE TABLE Category (
	categoryId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	categoryName VARCHAR(20) NOT NULL UNIQUE CHECK (categoryName <> '')
);

CREATE TABLE PhotoCategories (
	PhotoCategories INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	categoryId INT NOT NULL,
	photoId INT NOT NULL,

	UNIQUE(categoryId,photoId),

	FOREIGN KEY (photoId) REFERENCES Photos (photoId) ON DELETE CASCADE,
	FOREIGN KEY (categoryId) REFERENCES Category (categoryId) ON DELETE CASCADE

);

CREATE TABLE inapropiateWords (
	inapropiateWordId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	wordValue VARCHAR(20) NOT NULL UNIQUE CHECK (wordValue <> '')

);

-- Create the rest of your tables...