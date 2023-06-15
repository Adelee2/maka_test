import mongoose from 'mongoose';
// import validator from 'validator';
import toJSON from '../toJSON/toJSON';
import paginate from '../paginate/paginate';
import { IInventoryDoc, IInventoryModel } from './inventory.interfaces';

const inventorySchema = new mongoose.Schema<IInventoryDoc, IInventoryModel>(
  {
    itemID: {
      type: Number,
      unique: true,
      trim: true,
    },
    itemName: {
      type: String,
      trim: true,
    },
    quantity: {
      type: Number,
      trim: true,
    },
    
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
inventorySchema.plugin(toJSON);
inventorySchema.plugin(paginate);


const Inventory = mongoose.model<IInventoryDoc, IInventoryModel>('Inventory', inventorySchema);

export default Inventory;
