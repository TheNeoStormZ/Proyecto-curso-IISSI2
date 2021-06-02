-- SECURITY MEASURES ---
 -- PROTECT PHOTOS FROM VANDALISM
DELIMITER //
CREATE OR REPLACE TRIGGER myPhotoNotYours
	BEFORE UPDATE ON photos
	FOR EACH ROW
	BEGIN
	IF OLD.userId != NEW.userId  THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = '¡La foto no te pertenece!';
	END IF;
	END//
DELIMITER ;

-- RN-C01
DELIMITER //
CREATE OR REPLACE TRIGGER noMorePhotos
	AFTER INSERT ON photos
	FOR EACH ROW
	BEGIN
	DECLARE cuenta INT;
	SELECT COUNT(*)  INTO cuenta FROM photos WHERE userId=NEW.userId;
	
	IF cuenta >50 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Maximo de fotos alcanzado';
	END IF;
	END//
DELIMITER ;

-- RN-C02

DELIMITER //
CREATE OR REPLACE TRIGGER noBadWordsInPhotos
	BEFORE INSERT ON photos
	FOR EACH ROW
	BEGIN
	DECLARE cuenta INT;
	SELECT COUNT(*)  INTO cuenta FROM inapropiateWords WHERE NEW.title LIKE inapropiateWords.wordValue OR NEW.description LIKE inapropiateWords.wordValue;
	IF cuenta >0 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Don`t be rude!';
	END IF;
	END//
DELIMITER ;

DELIMITER //
CREATE OR REPLACE TRIGGER noBadWordsInPhotosUpdate
	BEFORE UPDATE ON photos
	FOR EACH ROW
	BEGIN
	DECLARE cuenta INT;
	SELECT COUNT(*)  INTO cuenta FROM inapropiateWords WHERE NEW.title LIKE inapropiateWords.wordValue OR NEW.description LIKE inapropiateWords.wordValue;
	IF cuenta >0 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Don`t be rude!';
	END IF;
	END//
DELIMITER ;

 -- RN-B07

DELIMITER //
CREATE OR REPLACE TRIGGER noBadWordsInComments
	BEFORE INSERT ON Comments
	FOR EACH ROW
	BEGIN
	DECLARE cuenta INT;
	SELECT COUNT(*)  INTO cuenta FROM inapropiateWords WHERE NEW.commentText LIKE inapropiateWords.wordValue;
	IF cuenta >0 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Don`t be rude!';
	END IF;
	END//
DELIMITER ;


DELIMITER //
CREATE OR REPLACE TRIGGER noBadWordsInCommentsUpdate
	BEFORE UPDATE ON Comments
	FOR EACH ROW
	BEGIN
	DECLARE cuenta INT;
	SELECT COUNT(*)  INTO cuenta FROM inapropiateWords WHERE NEW.commentText LIKE inapropiateWords.wordValue;
	IF cuenta >0 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Don`t be rude!';
	END IF;
	END//
DELIMITER ;

-- RN-B05
DELIMITER //
CREATE OR REPLACE TRIGGER dontLoseComments
	BEFORE DELETE ON photos
	FOR EACH ROW
	BEGIN
	DECLARE cuenta INT;
	SELECT COUNT(*)  INTO cuenta FROM comments WHERE photoId=OLD.photoId;
	
	IF cuenta >0 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La foto no se puede borrar porque tiene comentarios';
	END IF;
	END//
DELIMITER ;

DELIMITER //
CREATE OR REPLACE TRIGGER dontLoseCommentsPrivate
	BEFORE UPDATE ON photos
	FOR EACH ROW
	BEGIN
	DECLARE cuenta INT;
	SELECT COUNT(*)  INTO cuenta FROM comments WHERE photoId=OLD.photoId;
	
	IF (cuenta >0 && NEW.visibility='Private') THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La foto no se puede poner privada porque tiene comentarios';
	END IF;
	END//
DELIMITER ;
