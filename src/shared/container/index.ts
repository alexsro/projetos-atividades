import { container } from 'tsyringe';

import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import ProjectsRepository from '@modules/projects/infra/typeorm/repositories/ProjectsRepository';

import IActivitiesRepository from '@modules/projects/repositories/IActivitiesRepository';
import ActivitiesRepository from '@modules/projects/infra/typeorm/repositories/ActivitiesRepository';

container.registerSingleton<IProjectsRepository>(
  'ProjectsRepository',
  ProjectsRepository,
);

container.registerSingleton<IActivitiesRepository>(
  'ActivitiesRepository',
  ActivitiesRepository,
);
