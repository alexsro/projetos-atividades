import { inject, injectable } from 'tsyringe';

import AppError from 'shared/errors/AppError';
import Activities from '../infra/typeorm/entities/Activities';
import IActivitiesRepository from '../repositories/IActivitiesRepository';
import IProjectsRepository from '../repositories/IProjectsRepository';
import ICreateActivitieDTO from '../dtos/ICreateActivitieDTO';

@injectable()
class CreateActivitieService {
  constructor(
    @inject('ActivitiesRepository')
    private activitiesRepository: IActivitiesRepository,
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({
    name,
    project_id,
    finished,
    start_date,
    end_date,
  }: ICreateActivitieDTO): Promise<Activities> {
    const project = await this.projectsRepository.findById(project_id);

    if (!project) {
      throw new AppError('Projeto informado não existe');
    }

    const activitie = await this.activitiesRepository.create({
      name,
      project_id,
      finished,
      start_date,
      end_date,
    });

    return activitie;
  }
}

export default CreateActivitieService;
