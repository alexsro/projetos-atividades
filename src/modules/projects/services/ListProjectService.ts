import AppError from 'shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import Projects from '../infra/typeorm/entities/Projects';
import IProjectsRepository from '../repositories/IProjectsRepository';

interface IRequest {
  id: string;
}

@injectable()
class ListProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Projects> {
    const project = await this.projectsRepository.findById(id);

    if (!project) {
      throw new AppError('Project not found!');
    }

    return project;
  }
}

export default ListProjectService;
