const pool = require('../../db/postgresqldb.js')
const redis = require('../../db/redis.js')

exports.getProductReviews = async (req, res) => {
  const id = req.query.product_id;
  const page = req.query.page;
  const count = req.query.count;
  const sort = req.query.sort;
  const rowsToSkip = (page - 1) * count;
  try{
      let finalResponse = await redis.getOrSetCache(`review?id=${id}&page=${page}&count=${count}&sort=${sort}`, async ()=>{
      let orderColumn;
      if (sort === 'newest') {
        orderColumn = 'r.date DESC';
      } else {
        orderColumn = 'r.helpfulness DESC';
      }

      const reviewsQuery = `
      SELECT
      r.id AS review_id,
      r.rating,
      r.summary,
      r.recommend,
      r.response
      r.body,
      r.date,
      r.reviewer_name,
      r.helpfulness,
      COALESCE(json_agg(json_build_object('id', rp.id, 'photo_url', rp.photo_url)), '[]') AS photos
      FROM
      reviews AS r
      LEFT JOIN reviews_photos AS rp ON r.id = rp.review_id
    WHERE
      r.product_id = $1
    GROUP BY
      r.id
    ORDER BY
      ${orderColumn}
    OFFSET $2
    LIMIT $3
    `;

      const result = await pool.query(reviewsQuery, [id, rowsToSkip, count]);
      // console.log('reviewsQuery ===>>>>>', result.rows)
      const reviews = result.rows.map((row) => {
        const formattedDate = new Date(Number(row.date)).toISOString();
        return {
          review_id: row.review_id,
          rating: row.rating,
          summary: row.summary,
          recommend: row.recommend,
          response: row.response,
          body: row.body,
          date: formattedDate,
          reviewer_name: row.reviewer_name,
          helpfulness: row.helpfulness,
          photos: row.photos[0]['id'] === null? []:row.photos
        };
      });

      const finalReviewResponse = {
        product: id,
        page: Number(page),
        count: Number(count),
        results: reviews
      };

      return finalReviewResponse;
  });
    res.status(200).send(finalResponse);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
};


exports.getProductMeta = async (req, res) => {
  const id = req.query.product_id;

  try {
    const finalResponse = await redis.getOrSetCache(`reviews/meta?product_id=${id}`, async () => {
      const finalMetaResponse = {
        product_id: id,
        ratings: {},
        recommended: {},
        characteristics: {},
      };

      const [ratingResult, recommendResult, characteristicsResult] = await Promise.all([
        pool.query({
          text: 'SELECT rating, COUNT(*) as count FROM reviews WHERE product_id = $1 GROUP BY rating ORDER BY rating ASC;',
          values: [id],
        }),
        pool.query({
          text: 'SELECT recommend, COUNT(*) as count FROM reviews WHERE product_id = $1 GROUP BY recommend ORDER BY count ASC;',
          values: [id],
        }),
        pool.query({
          text: `SELECT c.id AS characteristic_id, c.name AS characteristic_name, AVG(cr.value) AS average_value
                FROM characteristics c
                INNER JOIN characteristic_reviews cr ON c.id = cr.characteristic_id
                WHERE c.product_id = $1
                GROUP BY c.id, c.name;`,
          values: [id],
        }),
      ]);

      for (let rating of ratingResult.rows) {
        finalMetaResponse.ratings[rating.rating] = rating.count.toString();
      }

      for (let recommend of recommendResult.rows) {
        finalMetaResponse.recommended[recommend.recommend.toString()] = recommend.count.toString();
      }

      for (let characteristic of characteristicsResult.rows) {
        finalMetaResponse.characteristics[characteristic.characteristic_name] = {
          id: characteristic.characteristic_id,
          // value: characteristic.average_value.toFixed(16),
          value: characteristic.average_value,
        };
      }
      return finalMetaResponse;
    });

    res.status(200).send(finalResponse);
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
  for (let photo of newReview.photos) {
    await pool.query(
    `INSERT INTO reviews_photos (review_id, photo_url)
    VALUES ('${newReviewId}', '${photo}')`
    );
  };
  for (let characteristicId in newReview.characteristics) {
    await pool.query(
    `INSERT INTO characteristic_reviews (characteristic_id, review_id, value)
    VALUES ('${characteristicId}', '${newReviewId}', '${newReview.characteristics[characteristicId]}')`
    );
  };
  res.sendStatus(201);
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

