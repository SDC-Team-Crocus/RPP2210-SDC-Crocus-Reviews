exports.getReviewsReponse = {
  "product": 1,
  "page": 1,
  "count": 5,
  "results": [
      {
          "review_id": 2,
          "rating": 4,
          "summary": "This product was ok!",
          "recommend": false,
          "response": "null",
          "body": "I really did not like this product solely because I am tiny and do not fit into it.",
          "date": "2021-01-09T07:47:13.963Z",
          "reviewer_name": "mymainstreammother",
          "helpfulness": 2,
          "photos": []
      },
      {
          "review_id": 1,
          "rating": 5,
          "summary": "This product was great!",
          "recommend": true,
          "response": "null",
          "body": "I really did or did not like this product based on whether it was sustainably sourced.  Then I found out that its made from nothing at all.",
          "date": "2020-07-30T03:41:21.467Z",
          "reviewer_name": "funtime",
          "helpfulness": 16,
          "photos": []
      }
  ]
};


exports.getReviewMetaResponse = {
  "product_id": 1,
  "ratings": {
      "4": "1",
      "5": "1"
  },
  "recommended": {
      "false": "1",
      "true": "1"
  },
  "characteristics": {
      "Fit": {
          "id": 1,
          "value": "4.0000000000000000"
      },
      "Length": {
          "id": 2,
          "value": "3.5000000000000000"
      },
      "Comfort": {
          "id": 3,
          "value": "5.0000000000000000"
      },
      "Quality": {
          "id": 4,
          "value": "4.0000000000000000"
      }
  }
};



exports.newReview = {
  "product_id": 71701,
  "rating": 4,
  "summary": "asdasdasdasxxxxxxxxx",
  "body": "zxzzzzzzzzzzzzzzzz",
  "recommend": true,
  "name": "george",
  "email": "iwiwooe@gmail.com",
  "photos": [
      "https://firebasestorage.googleapis.com/v0/b/aerio-54e8f.appspot.com/o/reviewImages%2Fbbbbb.jpg76e7efca-7ad2-4f25-80e7-3b7f446d29d9?alt=media&token=4693efc0-7c8c-4a37-b6f0-55fa240f2542"
  ],
  "characteristics": {
      "240595": 2,
      "240596": 3,
      "240597": 3,
      "240598": 5
  }
}