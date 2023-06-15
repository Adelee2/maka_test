import  { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IInventory {
 
  itemID: number;
  itemName: string;
  quantity: number;
}

export interface IInventoryDoc extends IInventory, Document {
}

export interface IInventoryModel extends Model<IInventoryDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

// export type UpdateInventoryBody = Partial<IInventory>;

// export type NewRegisteredInventory = Omit<IInventory, 'role' | 'isEmailVerified'>;

export type NewCreatedInventory = Partial<IInventory>;

export interface IInventoryWithTokens {
  inventory: IInventoryDoc;
}
