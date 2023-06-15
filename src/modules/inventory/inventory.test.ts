
import request from 'supertest';
import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import app from '../../app';
import setupTestDB from '../jest/setupTestDB';
// import Inventory from './inventory.model';
import { NewCreatedInventory } from './inventory.interfaces';

setupTestDB();

describe('Inventory routes', () => {
  describe('POST /inventory', () => {
    let newInventory: NewCreatedInventory;

    beforeEach(() => {
      newInventory = {
        itemID: faker.datatype.number({min: 1000000}) || 0,
        itemName: faker.name.findName(),
        quantity: faker.datatype.number({max:100})
      };
    });

    test('should return 201 and successfully create new inventory if data is ok', async () => {
    
      await request(app)
        .post('/inventory')
        .send([newInventory])
        .expect(httpStatus.CREATED);

    });


    test('should return 400 Bad request payload', async () => {
      
      await request(app)
        .post('/inventory')
        .send(newInventory)
        .expect(httpStatus.BAD_REQUEST);
    });
  });
});
