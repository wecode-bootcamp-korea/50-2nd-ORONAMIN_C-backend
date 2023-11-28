-- migrate:up
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_number` varchar(1000) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `address` varchar(3000) DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `product_quantity` int DEFAULT NULL,
  `total_price` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
);

-- migrate:down
DROP TABLE orders;
