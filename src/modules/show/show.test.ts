import mongoose from 'mongoose';
import request from 'supertest';
import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import app from '../../app';
import setupTestDB from '../jest/setupTestDB';
// import Show from './show.model';
import { NewCreatedShow } from './show.interfaces';

setupTestDB();

const showOne = {
  _id: new mongoose.Types.ObjectId(),
  showID: 323,
  itemID: 6446,
  quantity_sold: faker.datatype.number({max:10})
};


describe('Show routes', () => {
  describe('POST /show/:showID/buy_item/:itemID', () => {
    let newShow: NewCreatedShow;

    beforeEach(() => {
      newShow = {
        showID: faker.datatype.number({max:10}),
        itemID: faker.datatype.number({max:10})
      };
    });

    test('should return 400 if params not found', async () => {
    
      await request(app)
        .post(`/show/${showOne.showID}/buy_item/${showOne.itemID}`)
        .send(newShow)
        .expect(httpStatus.BAD_REQUEST);

    });

  })

  describe('GET /show/:showID/sold_items/:itemID', () => {
    test('should return 200 and the show object if data is ok', async () => {
      await request(app)
        .get(`/show/${showOne.showID}/sold_items/${showOne.itemID}`)
        .send()
        .expect(httpStatus.OK);
    });

  });
});
