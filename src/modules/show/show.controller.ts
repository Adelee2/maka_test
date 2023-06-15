import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import * as showService from './show.service';

export const create = catchAsync(async (req: Request, res: Response) => {
  const show = await showService.createShow(req.params);
  res.status(httpStatus.CREATED).send(show);
});

export const getShows = catchAsync(async (req: Request, res: Response) => {
 
  const result = await showService.queryShows(req.params);
  res.status(httpStatus.OK).send(result);
});
