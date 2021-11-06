import { inject, injectable } from 'tsyringe';

import Activities from '../infra/typeorm/entities/Activities';
import IActivitiesRepository from '../repositories/IActivitiesRepository';

interface IRequest {
  project_id: string;
}

@injectable()
class ListActivitiesService {
  constructor(
    @inject('ActivitiesRepository')
    private activitiessRepository: IActivitiesRepository,
  ) {}

  public async execute({ project_id }: IRequest): Promise<Activities[]> {
    let activities;

    if (project_id !== 'undefined') {
      activities = await this.activitiessRepository.findByProject(project_id);
    } else {
      activities = await this.activitiessRepository.findAllActivities();
    }

    return activities;
  }
}

export default ListActivitiesService;
