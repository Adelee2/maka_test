import httpStatus from 'http-status';
// import mongoose from 'mongoose';
import Inventory from './inventory.model';
import { NewCreatedInventory } from './inventory.interfaces';
import ApiError from '../errors/ApiError';

/**
 * Create a inventory
 * @param {NewCreatedInventory} inventoryBody
 */
export const create = async (inventoryBody: NewCreatedInventory[]): Promise<any> => {
  try{
    const bulkOps = inventoryBody.map((item:NewCreatedInventory) => {
      const { itemID, itemName, quantity } = item;
      return {
        updateOne: {
          filter: { itemID },
          update: { $set: { itemName, quantity } },
          upsert: true,
        },
      };
    });


  const result = await Inventory.bulkWrite(bulkOps);
  if(result.isOk()){
    return {message:"successful"}
  }
  }catch(e){
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Could not complete request');
  }
  
};
