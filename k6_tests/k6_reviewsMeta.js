import http from 'k6/http';
import { sleep , check } from 'k6';

export const options = {
  discardResponseBodies: true,
  scenarios: {
    open_model: {
      executor: 'constant-arrival-rate',
      // Our test should last 30 seconds in total
      duration: '1m',//5 - 10 min //Michelle said 1m is good enough
      // It should start 30 iterations per `timeUnit`. Note that iterations starting points
      // will be evenly spread across the `timeUnit` period.
      rate: 1750,
      // It should start `rate` iterations per second
      timeUnit: '1s',
      // It should preallocate 10 VUs before starting the test
      preAllocatedVUs: 10,
      // It is allowed to spin up to 10000 maximum VUs to sustain the defined
      // constant arrival rate.
      maxVUs: 175000,
    },
  },
};

export default function () {
  let productId = Math.floor(Math.random()*10000) + 1;
  let res = http.get(`http://localhost:5000/reviews/meta?product_id=${productId}`);
  check(res, { "status was 200": (r) => r.status == 200 });
  // sleep(1); //per the official doc if use constant arrival rate, no need to add the sleep()!!!!
}