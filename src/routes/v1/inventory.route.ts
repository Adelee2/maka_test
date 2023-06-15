import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { inventoryController, inventoryValidation } from '../../modules/inventory';

const router: Router = express.Router();

router
  .route('/')
  .post(validate(inventoryValidation.createInventory), inventoryController.create)
export default router;
