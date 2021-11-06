import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import ProjectsController from '../controllers/ProjectsController';

const projectsRouter = Router();
const projectsController = new ProjectsController();

projectsRouter.get('/', projectsController.index);

projectsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  projectsController.indexById,
);

projectsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      start_date: Joi.date().required(),
      end_date: Joi.date().required(),
    },
  }),
  projectsController.create,
);

export default projectsRouter;
