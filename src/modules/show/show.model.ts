import mongoose from 'mongoose';
import toJSON from '../toJSON/toJSON';
import paginate from '../paginate/paginate';
import { IShowDoc, IShowModel } from './show.interfaces';
// import { Inventory } from '../inventory';

const showSchema = new mongoose.Schema<IShowDoc, IShowModel>(
  {
    showID: {
      type: Number,
      required: true,
      trim: true,
    },
    itemID: {
      type: Number,
      ref: 'Inventory',
    },
    quantity_sold: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
showSchema.plugin(toJSON);
showSchema.plugin(paginate);


const Show = mongoose.model<IShowDoc, IShowModel>('Show', showSchema);

export default Show;
