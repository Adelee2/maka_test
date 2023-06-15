import { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IShow {
  showID: number;
  itemID: number;
  quantity_sold: number;
}

export interface IShowDoc extends IShow, Document {
}

export interface IShowModel extends Model<IShowDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type NewCreatedShow = Omit<IShow, 'quantity_sold'>;
