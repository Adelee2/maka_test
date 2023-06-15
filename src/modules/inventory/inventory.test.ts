
import request from 'supertest';
import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import app from '../../app';
import setupTestDB from '../jest/setupTestDB';
import Inventory from './inventory.model';
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
    
      const res = await request(app)
        .post('/inventory')
        .send(newInventory)
        .expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        id: expect.anything(),
        itemID: newInventory.itemID,
        itemName: newInventory.itemName,
        quantity: newInventory.quantity,
      });

      const dbInventory = await Inventory.findById(res.body.id);
      expect(dbInventory).toBeDefined();
      if (!dbInventory) return;

      // expect(dbInventory.password).not.toBe(newInventory.password);
      // expect(dbInventory).toMatchObject({ name: newInventory.name, email: newInventory.email, role: newInventory.role, isEmailVerified: false });
    });


    test('should return 400 error if not found', async () => {
      newInventory.itemID = faker.datatype.number({min: 1000000});

      await request(app)
        .post('/inventory')
        .send(newInventory)
        .expect(httpStatus.BAD_REQUEST);
    });
  });
});
