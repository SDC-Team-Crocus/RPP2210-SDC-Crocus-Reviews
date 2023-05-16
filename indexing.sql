\c sdc_reviews;

CREATE INDEX idx_product_id
ON reviews (product_id);

CREATE INDEX idx_review_id
ON reviews_photos (review_id);

-- DROP INDEX idx_product_id;

-- DROP INDEX idx_review_id;

CREATE INDEX idx_characteristics_product_id ON characteristics (product_id);

CREATE INDEX idx_characteristic_reviews_characteristic_id ON characteristic_reviews (characteristic_id);