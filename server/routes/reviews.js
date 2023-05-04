const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews.js')

router.get('/', reviewsController.getProductReviews);

router.get('/meta', reviewsController.getProductMeta);

router.post('/', reviewsController.postNewReview);

router.put('/:review_id/helpful', reviewsController.updateReviewHelpfulness);

router.put('/:review_id/report', reviewsController.reportReview);

module.exports = router;