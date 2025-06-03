import { Router } from 'express';
import { expressRouteAdapter } from '../adapters/express.route.adapter';
import { createUserControllerFactory } from '@/main/factories/controller/create-user.controller';
import { findAllUsersControllerFactory } from '@/main/factories/controller/find-all-users.controller';
import { findUserByIdControllerFactory } from '@/main/factories/controller/find-user-by-id.controller';
import { deleteUserByIdControllerFactory } from '@/main/factories/controller/delete-user.controller';
import { updateUserControllerFactory } from '@/main/factories/controller/update-user.controller';

export const userRoutes = Router();

const { createUserController } = createUserControllerFactory();
const { findAllUsersController } = findAllUsersControllerFactory();
const { findUserByIdController } = findUserByIdControllerFactory();
const { deleteUserByIdController } = deleteUserByIdControllerFactory();
const { updateUserController } = updateUserControllerFactory();

userRoutes.post('/', expressRouteAdapter(createUserController));
userRoutes.get('/', expressRouteAdapter(findAllUsersController));
userRoutes.get('/:id', expressRouteAdapter(findUserByIdController));
userRoutes.put('/:id', expressRouteAdapter(updateUserController));
userRoutes.delete('/:id', expressRouteAdapter(deleteUserByIdController));
