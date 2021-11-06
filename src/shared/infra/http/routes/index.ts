import { Router } from 'express';
import projectsRouter from '@modules/projects/infra/http/routes/Projects.routes';
import activitiesRouter from '@modules/projects/infra/http/routes/Activities.routes';

const routes = Router();

routes.use('/projects', projectsRouter);
routes.use('/activities', activitiesRouter);

export default routes;
