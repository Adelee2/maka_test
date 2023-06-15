import mongoose from 'mongoose';
import request from 'supertest';
import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import app from '../../app';
import setupTestDB from '../jest/setupTestDB';
import Show from './show.model';
import { NewCreatedShow } from './show.interfaces';

setupTestDB();

const showOne = {
  _id: new mongoose.Types.ObjectId(),
  showID: faker.datatype.number({min: 1000000}),
  itemID: faker.datatype.number({min: 1000000})
};


describe('Show routes', () => {
  describe('POST /shows', () => {
    let newShow: NewCreatedShow;

    beforeEach(() => {
      newShow = {
        showID: faker.datatype.number({min: 1000000}),
        itemID: faker.datatype.number({min: 1000000})
      };
    });

    // test('should return 201 and successfully create new show if data is ok', async () => {
    
    //   const res = await request(app)
    //     .post(`/show/${showOne.showID}/buy_item/${showOne.itemID}`)
    //     .send(newShow)
    //     .expect(httpStatus.CREATED);

    //   expect(res.body).not.toHaveProperty('password');
    //   expect(res.body).toEqual({
    //     id: expect.anything(),
    //     showID: newShow.showID,
    //     itemID: newShow.itemID,
      
    //   });

    //   const dbShow = await Show.findById(res.body.id);
    //   expect(dbShow).toBeDefined();
    //   if (!dbShow) return;

    //   expect(dbShow).toMatchObject({ showID: newShow.showID, itemID: newShow.itemID });
    // });

    test('should return 400 error if itemID is invalid', async () => {
     
      await request(app)
        .post(`/show/${showOne.showID}/buy_item/${showOne.itemID}`)
        .send(newShow)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if itemID is already used', async () => {
     

      await request(app)
        .post(`/show/${showOne.showID}/buy_item/${showOne.itemID}`)
        .send(newShow)
        .expect(httpStatus.BAD_REQUEST);
    });
  })

  describe('GET /show/:showID/buy_item/:itemID)', () => {
    test('should return 200 and apply the default query options', async () => {
      // await insertShows([showOne, showTwo, admin]);

      const res = await request(app)
        .get(`/show/${showOne.showID}/buy_item/${showOne.itemID}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 3,
      });
      expect(res.body.results).toHaveLength(3);
      expect(res.body.results[0]).toEqual({
        id: showOne._id.toHexString(),
        showID: showOne.showID,
        itemID: showOne.itemID
        
      });
    });

    test('should correctly apply filter on showID field', async () => {
     const res = await request(app)
        .get(`/show/${showOne.showID}/buy_item/${showOne.itemID}`)
        
        .query({ showID: showOne.showID })
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 1,
      });
      expect(res.body.results).toHaveLength(1);
      expect(res.body.results[0].id).toBe(showOne._id.toHexString());
    });


    test('should correctly sort the returned array if descending sort param is specified', async () => {

      const res = await request(app)
        .get(`/show/${showOne.showID}/buy_item/${showOne.itemID}`)
        
        .query({ sortBy: 'createdAt:desc' })
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 3,
      });
      expect(res.body.results).toHaveLength(3);
      // expect(res.body.results[0].id).toBe(showOne._id.toHexString());
      // expect(res.body.results[1].id).toBe(showTwo._id.toHexString());
      // expect(res.body.results[2].id).toBe(admin._id.toHexString());
    });


  });

  describe('GET /show/:showID/sold_items/:itemID', () => {
    test('should return 200 and the show object if data is ok', async () => {
      const res = await request(app)
        .get(`/show/${showOne.showID}/sold_items/${showOne.itemID}`)
        
        .send()
        .expect(httpStatus.OK);

      expect(res.body).not.toHaveProperty('password');
      expect(res.body).toEqual({
        id: showOne._id.toHexString(),
        itemID: showOne.itemID,
        showID: showOne.showID
        
      });
    });

    test('should return 200 and the show object if admin is trying to get another show', async () => {
      await request(app)
        .get(`/show/${showOne.showID}/sold_items/${showOne.itemID}`)
        .send()
        .expect(httpStatus.OK);
    });

    test('should return 400 error if showId is not a valid mongo id', async () => {
      await request(app)
        .get('/shows/invalidId') 
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 404 error if show is not found', async () => {
     await request(app)
        .get(`/show/${showOne.showID}/sold_items/${showOne.itemID}`)
        
        .send()
        .expect(httpStatus.NOT_FOUND);
    });
  });
});
