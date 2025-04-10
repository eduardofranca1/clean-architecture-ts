import { Router } from 'express';
import { createUserControllerFactory } from '@/main/factories/controller/create-user.controller';
import { findAllUsersControllerFactory } from '@/main/factories/controller/find-all-users.controller';
import { expressRouteAdapter } from '../adapters/express.route.adapter';

export const userRoutes = Router();

const { createUserController } = createUserControllerFactory();
const { findAllUsersController } = findAllUsersControllerFactory();

userRoutes.post('/', expressRouteAdapter(createUserController));
userRoutes.get('/', expressRouteAdapter(findAllUsersController));
