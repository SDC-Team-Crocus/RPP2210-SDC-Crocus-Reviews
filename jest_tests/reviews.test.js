// const sum = (a,b) => {
//   return a + b;
// };

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });

// *********************tests start from this line********************************

import {getProductReviews, getProductMeta, postNewReview, updateReviewHelpfulness, reportReview} from '../server/controllers/reviews.js';
import {getReviewsReponse, getReviewMetaResponse, newReview} from './exampleData.js';
import request from 'supertest';
import express from 'express';
import router from '../server/routes/reviews.js';

const app = new express();
app.use(express.json()); //forgot to add this parser in test, when running the test for post routes, the test is not be able to read the req.body!
app.use('/reviews', router);

describe('Test controllers', function() {
  test('responds to /reviews GET request', async ()=> {
    const req = {query: {product_id: 1, page: 1, count:5}, method: 'GET'};
    const res = {
      text: '',
      statusCode: '',
      status: function(input) {
        this.statusCode = input;
        return this;
      },
      send: function(input){
        this.text = input
      }
    };
    await getProductReviews(req, res);
    expect(!!res.text.results).toEqual(true);
    });


  test('responds to /reviews/meta GET request', async ()=> {
    const req = {query: {product_id: 1}, method: 'GET'};
    const res = {
      text: '',
      statusCode: '',
      status: function(input) {
        this.statusCode = input;
        return this;
      },
      send: function(input){
        this.text = input
      }
    };
    await getProductMeta(req, res);
    expect(!!res.text).toEqual(true);
    });


  test('responds to /reviews POST request', async ()=> {
    const req = {body: newReview, method: 'POST'};
    const res = {
      // text: '',
      statusCode: '',
      sendStatus: function(input) {
        this.statusCode = input;
        return this;
      },
      // send: function(input){
      //   this.text = input
      // }
    };
    await postNewReview(req, res);
    expect(res.statusCode).toEqual(201);
    });

  test('responds to /reviews/:review_id/helpful PUT request', async ()=> {
    const req = {params: {review_id: 1}, method: 'PUT'};
    const res = {
      // text: '',
      statusCode: '',
      sendStatus: function(input) {
        this.statusCode = input;
        return this;
      },
      // send: function(input){
      //   this.text = input
      // }
    };
    await updateReviewHelpfulness(req, res);
    expect(res.statusCode).toEqual(204);
    });


  test('responds to /reviews/:review_id/report PUT request', async ()=> {
    const req = {params: {review_id: 1}, method: 'PUT'};
    const res = {
      // text: '',
      statusCode: '',
      sendStatus: function(input) {
        this.statusCode = input;
        // return this;  ==>maybe no need to add this line!
      },
      // send: function(input){
      //   this.text = input
      // }
    };
    await reportReview(req, res);
    expect(res.statusCode).toEqual(204);
    });
  });


  describe('Test routes', function() {
    test('/reviews GET route', async ()=> {
      const res = await request(app).get('/reviews');
      expect(res.statusCode).toBe(200);
      });

    test('/reviews/meta GET route', async ()=> {
      const res = await request(app).get('/reviews/meta');
      expect(res.statusCode).toBe(200);
      });

    test('/reviews POST route', async ()=> {
      const res = await request(app).post('/reviews').send(newReview);
      expect(res.statusCode).toBe(201);
      });

    test('/reviews/:review_id/helpful PUT route', async ()=> {
      const res = await request(app).put('/reviews/1/helpful');
      expect(res.statusCode).toBe(204);
      });

    test('/reviews/:review_id/report PUT route', async ()=> {
      const res = await request(app).put('/reviews/1/report');
      expect(res.statusCode).toBe(204);
      });
  });

  // afterAll callback connect query


  //*********************************tests end here******************** */

//   // const sum = (a,b) => {
// //   return a + b;
// // };

// // test('adds 1 + 2 to equal 3', () => {
// //   expect(sum(1, 2)).toBe(3);
// // });

// // *********************tests start from this line********************************

// import {getProductReviews, getProductMeta, postNewReview, updateReviewHelpfulness, reportReview} from '../server/controllers/reviews.js';
// import {getReviewsReponse, getReviewMetaResponse, newReview} from './exampleData.js';
// import request from 'supertest';
// import express from 'express';
// import router from '../server/routes/reviews.js';

// const app = new express();
// app.use(express.json()); //forgot to add this parser in test, when running the test for post routes, the test is not be able to read the req.body!
// app.use('/reviews', router);

// describe('Test controllers', function() {
//   test('responds to /reviews GET request', async ()=> {
//     const req = {query: {product_id: 1, page: 1, count:5}, method: 'GET'};
//     const res = {
//       text: '',
//       statusCode: '',
//       status: function(input) {
//         this.statusCode = input;
//         return this;
//       },
//       send: function(input){
//         this.text = input
//       }
//     };
//     await getProductReviews(req, res);
//     expect(!!res.text.results).toEqual(true);
//     });


//   test('responds to /reviews/meta GET request', async ()=> {
//     const req = {query: {product_id: 1}, method: 'GET'};
//     const res = {
//       text: '',
//       statusCode: '',
//       status: function(input) {
//         this.statusCode = input;
//         return this;
//       },
//       send: function(input){
//         this.text = input
//       }
//     };
//     await getProductMeta(req, res);
//     expect(!!res.text).toEqual(true);
//     });


//   test('responds to /reviews POST request', async ()=> {
//     const req = {body: newReview, method: 'POST'};
//     const res = {
//       // text: '',
//       statusCode: '',
//       sendStatus: function(input) {
//         this.statusCode = input;
//         return this;
//       },
//       // send: function(input){
//       //   this.text = input
//       // }
//     };
//     await postNewReview(req, res);
//     expect(res.statusCode).toEqual(201);
//     });

//   test('responds to /reviews/:review_id/helpful PUT request', async ()=> {
//     const req = {params: {review_id: 1}, method: 'PUT'};
//     const res = {
//       // text: '',
//       statusCode: '',
//       sendStatus: function(input) {
//         this.statusCode = input;
//         return this;
//       },
//       // send: function(input){
//       //   this.text = input
//       // }
//     };
//     await updateReviewHelpfulness(req, res);
//     expect(res.statusCode).toEqual(204);
//     });


//   test('responds to /reviews/:review_id/report PUT request', async ()=> {
//     const req = {params: {review_id: 1}, method: 'PUT'};
//     const res = {
//       // text: '',
//       statusCode: '',
//       sendStatus: function(input) {
//         this.statusCode = input;
//         // return this;  ==>maybe no need to add this line!
//       },
//       // send: function(input){
//       //   this.text = input
//       // }
//     };
//     await reportReview(req, res);
//     expect(res.statusCode).toEqual(204);
//     });
//   });


//   describe('Test routes', function() {
//     test('/reviews GET route', async ()=> {
//       const res = await request(app).get('/reviews');
//       expect(res.statusCode).toBe(200);
//       });

//     test('/reviews/meta GET route', async ()=> {
//       const res = await request(app).get('/reviews/meta');
//       expect(res.statusCode).toBe(200);
//       });

//     test('/reviews POST route', async ()=> {
//       const res = await request(app).post('/reviews').send(newReview);
//       expect(res.statusCode).toBe(201);
//       });

//     test('/reviews/:review_id/helpful PUT route', async ()=> {
//       const res = await request(app).put('/reviews/1/helpful');
//       expect(res.statusCode).toBe(204);
//       });

//     test('/reviews/:review_id/report PUT route', async ()=> {
//       const res = await request(app).put('/reviews/1/report');
//       expect(res.statusCode).toBe(204);
//       });

//   });