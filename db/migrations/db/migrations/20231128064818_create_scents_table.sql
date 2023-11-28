-- migrate:up
CREATE TABLE `scents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(2000) DEFAULT NULL,
  `scent_desc` varchar(3000) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- migrate:down
DROP TABLE scents;
