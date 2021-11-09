import { Router } from 'express';
import projectsRouter from '@modules/projects/infra/http/routes/Projects.routes';
import activitiesRouter from '@modules/projects/infra/http/routes/Activities.routes';
import statsRouter from '@modules/projects/infra/http/routes/Stats.routes';

const routes = Router();

routes.use('/projects', projectsRouter);
routes.use('/activities', activitiesRouter);
routes.use('/stats', statsRouter);

export default routes;
