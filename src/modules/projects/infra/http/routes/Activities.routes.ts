import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import ActivitiesController from '../controllers/ActivitiesController';

const activitiesRouter = Router();
const activitiesController = new ActivitiesController();

activitiesRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      project_id: Joi.string().uuid(),
    },
  }),
  activitiesController.index,
);

activitiesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  activitiesController.indexById,
);

activitiesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      project_id: Joi.string().required(),
      finished: Joi.boolean().required(),
      start_date: Joi.date().required(),
      end_date: Joi.date().required(),
    },
  }),
  activitiesController.create,
);

export default activitiesRouter;
