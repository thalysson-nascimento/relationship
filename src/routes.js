import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PostModuleController from './app/controllers/PostModuleController';
import PublicListModuleController from './app/controllers/PublicListModuleController';
import CommentModuleController from './app/controllers/CommentModuleController';

import authMiddlewares from './app/middlewares/auth';
import authMiddlewaresAdmin from './app/middlewares/authAdmin';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'API Feedback 1.0' }));

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddlewares);

routes.put('/users', UserController.update);

routes.post('/post-modules', PostModuleController.store);
routes.get('/post-modules', PostModuleController.index);

routes.get('/public-list-module', PublicListModuleController.index);

routes.post('/comment-module', CommentModuleController.store);
routes.get('/comment-module', CommentModuleController.index);

routes.use(authMiddlewaresAdmin);
routes.get('/t');

export default routes;
