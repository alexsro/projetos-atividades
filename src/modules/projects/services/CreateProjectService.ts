import { inject, injectable } from 'tsyringe';
import ICreateProjectDTO from '../dtos/ICreateProjectDTO';

import Projects from '../infra/typeorm/entities/Projects';
import IProjectsRepository from '../repositories/IProjectsRepository';

@injectable()
class CreateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({
    name,
    start_date,
    end_date,
  }: ICreateProjectDTO): Promise<Projects> {
    const project = await this.projectsRepository.create({
      name,
      start_date,
      end_date,
    });

    return project;
  }
}

export default CreateProjectService;
