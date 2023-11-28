-- migrate:up
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nickname` varchar(50) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `phone_number` varchar(1000) DEFAULT NULL,
  `birthday` varchar(1000) DEFAULT NULL,
  `address` varchar(1000) DEFAULT NULL,
  `gender` varchar(1000) DEFAULT NULL,
  `point` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `admin_status` int DEFAULT '0',
  PRIMARY KEY (`id`)
);

-- migrate:down
DROP TABLE users;

