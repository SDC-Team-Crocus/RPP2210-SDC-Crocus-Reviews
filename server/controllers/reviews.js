const pool = require('../../db/postgresqldb.js')

exports.getProductReviews = async (req, res) => {
  // console.log(req.query.product_id)
  let id = req.query.product_id;
  let page = req.query.page;
  let count = req.query.count;
  let sort = req.query.sort;
  let rowsToSkip = (page - 1) * count;
  try {
  if (sort === 'newest') {
  let result = await pool.query(`SELECT id AS review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness FROM reviews WHERE product_id = '${id}' ORDER BY date DESC OFFSET '${rowsToSkip}' LIMIT '${count}'`);
  // console.log('result.rows', result.rows)
  let reviews = result.rows;
  for (let review of reviews) {
    let photoUrl = await pool.query(`SELECT id, photo_url from reviews_photos WHERE review_id = '${review.review_id}'`);
    // console.log('photoUrl.rows', photoUrl.rows);
    review['photos'] = [...photoUrl.rows];
    let date = new Date(Number(review['date']))
    let formattedDate = date.toISOString()
    review['date'] = formattedDate;
  };
  let finalReviewResponse = {
    'product': id,
    'page': Number(page),
    'count': Number(count),
    'results': [...reviews]
  }
  // console.log('finalReviewResponse', finalReviewResponse)
  res.status(200).send(finalReviewResponse);
} else {
  let result = await pool.query(`SELECT id AS review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness FROM reviews WHERE product_id = '${id}' ORDER BY helpfulness DESC OFFSET '${rowsToSkip}' LIMIT '${count}'`);
  // console.log('result.rows', result.rows)
  let reviews = result.rows;
  for (let review of reviews) {
    let photoUrl = await pool.query(`SELECT id, photo_url from reviews_photos WHERE review_id = '${review.review_id}'`);
    // console.log('photoUrl.rows', photoUrl.rows);
    review['photos'] = [...photoUrl.rows];
    let date = new Date(Number(review['date']))
    let formattedDate = date.toISOString()
    review['date'] = formattedDate;
  };
  let finalReviewResponse = {
    'product': id,
    'page': Number(page),
    'count': Number(count),
    'results': [...reviews]
  }
  // console.log('finalReviewResponse', finalReviewResponse)
  res.status(200).send(finalReviewResponse);
}
  } catch (err) {
    // console.log(err);
    res.send(err);
  }
};


exports.getProductMeta = async (req, res) => {
  // console.log('req.query.product_id',req.query.product_id)
  let id = req.query.product_id ;
  let finalMetaResponse = {
    "product_id": id,
    "ratings": {1: '0', 2: '0', 3: '0', 4: '0', 5: '0'},
    "recommended": {},
    "characteristics": {}
  };
  try {
  let ratingResult = await pool.query(`SELECT rating, COUNT(*) as count FROM reviews WHERE product_id = '${id}' GROUP BY rating ORDER BY rating ASC;`);
  for (let rating of ratingResult.rows) {
    finalMetaResponse.ratings[rating.rating] = rating.count;
  };
  let recommendResult = await pool.query(`SELECT recommend, COUNT(*) as count FROM reviews WHERE product_id = '${id}' GROUP BY recommend ORDER BY count ASC;`)
  for (let recommend of recommendResult.rows) {
    finalMetaResponse.recommended[recommend.recommend] = recommend.count;
  };
  let characteristicsResult = await pool.query (
    `SELECT c.id AS characteristic_id, c.name AS characteristic_name, AVG(cr.value) AS average_value
    FROM characteristics c
    INNER JOIN characteristic_reviews cr ON c.id = cr.characteristic_id
    WHERE c.product_id = '${id}'
    GROUP BY c.id, c.name;`
    );
    for (let characteristic of characteristicsResult.rows) {
      finalMetaResponse.characteristics[characteristic.characteristic_name] = {"id": characteristic.characteristic_id, "value": characteristic.average_value}
    }

  res.status(200).send(finalMetaResponse);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};


exports.postNewReview = async (req, res) => {
 let newReview = {
  product_id: req.body.product_id,
  rating: req.body.rating,
  date: Number(Date.now()),
  summary: req.body.summary,
  body: req.body.body,
  recommend: req.body.recommend,
  reported: 'FALSE',
  reviewer_name: req.body.name,
  reviewer_email: req.body.email,
  response: null,
  helpfulness: 0,
  photos: req.body.photos,
  characteristics: req.body.characteristics
 };

 try {
  let result = await pool.query(
  `INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
  VALUES ('${newReview.product_id}', '${newReview.rating}', '${newReview.date}', '${newReview.summary}', '${newReview.body}', '${newReview.recommend}', '${newReview.reported}', '${newReview.reviewer_name}', '${newReview.reviewer_email}', '${newReview.response}', '${newReview.helpfulness}')
  RETURNING id;`
  );
  let newReviewId = result.rows[0]["id"];
  // console.log('reviews insert success!')
  // console.log('newReviewId', newReviewId.rows[0]["id"])
  for (let photo of newReview.photos) {
    await pool.query(
    `INSERT INTO reviews_photos (review_id, photo_url)
    VALUES ('${newReviewId}', '${photo}')`
    );
  };
  // console.log('reviews photos insert success!')
  for (let characteristicId in newReview.characteristics) {
    await pool.query(
    `INSERT INTO characteristic_reviews (characteristic_id, review_id, value)
    VALUES ('${characteristicId}', '${newReviewId}', '${newReview.characteristics[characteristicId]}')`
    );
  };
  // console.log('reviews characs insert success!')
  res.sendStatus(201);
  // res.status(201).send('Your review has been successfully posted!');
 } catch (err) {
  console.log(err);
  res.send(err);
 }
};


exports.updateReviewHelpfulness = async (req, res) => {
  let id = req.params.review_id;
  try {
    await pool.query(
      `UPDATE reviews SET helpfulness = helpfulness + 1
      WHERE id = '${id}';`
    );
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.reportReview = async (req, res) => {
  let id = req.params.review_id;
  try {
    await pool.query(
      `UPDATE reviews SET reported = TRUE
      WHERE id = '${id}';`
    );
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

