import { getRepository, Repository } from 'typeorm';

import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';

import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import Projects from '../entities/Projects';

class ProjectsRepository implements IProjectsRepository {
  private ormRepository: Repository<Projects>;

  constructor() {
    this.ormRepository = getRepository(Projects);
  }

  public async findAllProjects(): Promise<Projects[]> {
    const projects = await this.ormRepository.find();
    return projects;
  }

  public async findById(id: string): Promise<Projects | undefined> {
    const findProject = await this.ormRepository.findOne({
      where: { id },
    });

    return findProject || null;
  }

  public async create(projectData: ICreateProjectDTO): Promise<Projects> {
    const project = this.ormRepository.create(projectData);

    await this.ormRepository.save(project);

    return project;
  }
}

export default ProjectsRepository;
