-- migrate:up
CREATE TABLE `basket` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `status_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  FOREIGN KEY (`status_id`) REFERENCES `pay_status` (`id`)
);

-- migrate:down
DROP TABLE basket;
