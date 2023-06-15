import Joi from 'joi';

export const createShow = {
  params: Joi.object().keys({
    showID: Joi.number().required(),
    itemID: Joi.number().required()
  }),
};


export const getShow = {
  params: Joi.object().keys({
    showID: Joi.number().required(),
    itemID: Joi.number().optional()
  }),
};