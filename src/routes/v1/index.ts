import express, { Router } from 'express';
import inventoryRoute from './inventory.route';
import showRoute from './show.route';

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [
  {
    path: '/inventory',
    route: inventoryRoute,
  },
  {
    path: '/show',
    route: showRoute
  }
];


defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});


export default router;
