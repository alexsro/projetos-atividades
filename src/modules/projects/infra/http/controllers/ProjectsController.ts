import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProjectsService from '@modules/projects/services/ListProjectsService';
import ListProjectService from '@modules/projects/services/ListProjectService';
import CreateProjectService from '@modules/projects/services/CreateProjectService';

export default class ProjectsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, start_date, end_date } = request.body;

    const createProject = container.resolve(CreateProjectService);

    const project = await createProject.execute({
      name,
      start_date,
      end_date,
    });

    return response.send(project);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listProjects = container.resolve(ListProjectsService);

    const projects = await listProjects.execute();

    return response.send(projects);
  }

  public async indexById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const listProject = container.resolve(ListProjectService);

    const project = await listProject.execute({
      id,
    });

    return response.send(project);
  }
}
