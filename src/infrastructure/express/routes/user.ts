import { Router } from 'express';
import { createUserControllerFactory } from '../../../main/factories/controller/create-user.controller';
import { expressRouteAdapter } from '../adapters/express.route.adapter';

export const userRoutes = Router();

const { createUserController } = createUserControllerFactory();

userRoutes.post('/', expressRouteAdapter(createUserController));
