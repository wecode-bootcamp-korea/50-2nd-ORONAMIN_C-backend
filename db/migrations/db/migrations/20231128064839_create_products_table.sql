-- migrate:up
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(1000) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `description` varchar(3000) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `brand_id` int DEFAULT NULL,
  `scent_id` int DEFAULT NULL,
  `image_id` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`),
  FOREIGN KEY (`scent_id`) REFERENCES `scents` (`id`),
  FOREIGN KEY (`image_id`) REFERENCES `images` (`id`)
);

-- migrate:down
DROP TABLE products;
