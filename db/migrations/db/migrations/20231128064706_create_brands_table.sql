-- migrate:up
CREATE TABLE `brands` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(1000) DEFAULT NULL,
  `logo` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- migrate:down
DROP TABLE brands;
