import httpStatus from 'http-status';
// import { IOptions } from '../paginate/paginate';
import { IShowDoc } from './show.interfaces';
import ApiError from '../errors/ApiError';
import { Inventory } from '../inventory';
import {Show} from './index'

/**
 * Create a show
 * @param {NewCreatedShow} showBody
 * @returns {Promise<IShowDoc>}
 */
export const createShow = async (showBody: Record<string, any>): Promise<IShowDoc> => {
  
 const inventory = await Inventory.findOne({itemID:showBody['itemID']})
  if(!inventory){
    throw new ApiError(httpStatus.BAD_REQUEST, 'Item not found!');
  }
  if(inventory.quantity<=0){
    throw new ApiError(httpStatus.BAD_REQUEST, 'insufficient inventory');
  }
  let temp = inventory.quantity
  inventory.quantity = temp-1

  const shows = await Show.findOne({itemID:showBody['itemID'], showID:showBody['showID']})
  if(!shows){
    
    const [createShow,updatedInventory] = await Promise.all([
      Show.create({...showBody,quantity_sold:1}),
      inventory.updateOne(inventory)
    ])

    if(createShow && updatedInventory){
      return createShow;
    }
  }
  else{
    let oldquantity = shows.quantity_sold
    shows.quantity_sold = oldquantity + 1
    const [updatedShow,updatedInventory] = await Promise.all([
      shows.updateOne(shows),
      inventory.updateOne(inventory)
    ])
    if(updatedShow && updatedInventory){
      return updatedShow;
    }
  }
  
   
  throw new ApiError(httpStatus.BAD_REQUEST, 'An error occured');
   
};


/**
 * Query for shows
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryShows = async (filter: Record<string, any>): Promise<any> => {

  if(filter['itemID']){
    return Show.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: ['$showID', filter['showID']] },
              { $eq: ['$itemID', filter['itemID']] }
            ]
          }
        }
      },
      {
        $lookup: {
          from: 'inventories',
          localField: 'itemID',
          foreignField: 'itemID',
          as: 'item'
        }
      },
      {
        $unwind: '$item'
      },
      {
        $project: {
          _id: 0,
          itemID: '$item.itemID',
          itemName: '$item.itemName',
          quantity_sold: '$quantity_sold'
        }
      }
    ]).exec();
  }
  return Show.aggregate([
    {
      $match: { showID: filter['showID'] }
    },
    {
      $lookup: {
        from: 'inventories',
        localField: 'itemID',
        foreignField: 'itemID',
        as: 'item'
      }
    },
    {
      $unwind: '$item'
    },
    {
      $project: {
        _id: 0,
        itemID: '$item.itemID',
        itemName: '$item.itemName',
        quantity_sold: '$quantity_sold'
      }
    }
  ]).exec();
};

