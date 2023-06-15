import Joi from 'joi';
// import { objectId } from '../validate/custom.validation';
// import { NewCreatedInventory } from './inventory.interfaces';

// const createInventoryBody: Record<keyof NewCreatedInventory, any> = {
//   itemID: Joi.number().required(),
//   itemName: Joi.string().required(),
//   quantity:Joi.number().required(),
// };

export const createInventory = {
  body: Joi.array().items(
    Joi.object({
      itemID: Joi.number().required(),
      itemName: Joi.string().required(),
      quantity: Joi.number().required(),
    })
  ),
};


export const getInventorys = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

