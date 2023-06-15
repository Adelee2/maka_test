import express, { Router } from 'express';
import { showvalidate } from '../../modules/validate';

import { showController, showValidation } from '../../modules/show';

const router: Router = express.Router();

router
  .route('/:showID/buy_item/:itemID')
  .post(showvalidate(showValidation.createShow), showController.create)

router
  .route('/:showID/sold_items/:itemID')
  .get(showvalidate(showValidation.getShow), showController.getShows)

router
  .route('/:showID/sold_items')
  .get(showvalidate(showValidation.getShow), showController.getShows)

export default router;
