import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProjectsWithStatsService from '@modules/projects/services/ListProjectsWithStatsService';

export default class StatsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProjectsWithStats = container.resolve(
      ListProjectsWithStatsService,
    );

    const projectsStats = await listProjectsWithStats.execute();

    return response.send(projectsStats);
  }
}
