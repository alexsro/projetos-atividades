import { inject, injectable } from 'tsyringe';

import Projects from '../infra/typeorm/entities/Projects';
import IProjectsRepository from '../repositories/IProjectsRepository';

@injectable()
class ListProjectsService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute(): Promise<Projects[]> {
    const project = await this.projectsRepository.findAllProjects();

    return project;
  }
}

export default ListProjectsService;
