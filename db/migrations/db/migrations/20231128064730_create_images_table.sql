-- migrate:up
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_source` varchar(3000) DEFAULT NULL,
  `image_desc` varchar(3000) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- migrate:down
DROP TABLE images;
