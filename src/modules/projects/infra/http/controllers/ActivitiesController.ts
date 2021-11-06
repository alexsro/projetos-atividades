import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListActivitiesService from '@modules/projects/services/ListActivitiesService';
import ListActivitieservice from '@modules/projects/services/ListActivitieService';
import CreateActivitieService from '@modules/projects/services/CreateActivitieService';

export default class ActivitiesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, project_id, finished, start_date, end_date } = request.body;

    const createActivitie = container.resolve(CreateActivitieService);

    const project = await createActivitie.execute({
      name,
      project_id,
      finished,
      start_date,
      end_date,
    });

    return response.send(project);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listActivities = container.resolve(ListActivitiesService);

    const { project_id } = request.query;

    const activities = await listActivities.execute({
      project_id: String(project_id),
    });

    return response.send(activities);
  }

  public async indexById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const listActivitie = container.resolve(ListActivitieservice);

    const activitie = await listActivitie.execute({
      id,
    });

    return response.send(activitie);
  }
}
