-- migrate:up
CREATE TABLE `pay_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- migrate:down
DROP TABLE pay_status;
