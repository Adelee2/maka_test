import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import * as inventoryService from './inventory.service';

export const create = catchAsync(async (req: Request, res: Response) => {
  const inventory = await inventoryService.create(req.body);
  res.status(httpStatus.CREATED).send(inventory);
});
