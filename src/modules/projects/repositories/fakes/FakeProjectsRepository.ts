import { uuid } from 'uuidv4';
import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';

import IProjectsRepository from '../IProjectsRepository';
import Projects from '../../infra/typeorm/entities/Projects';

class FakeProjectsRepository implements IProjectsRepository {
  private projects: Projects[] = [];

  public async findById(id: string): Promise<Projects | undefined> {
    const findProject = this.projects.find(project => project.id === id);

    return findProject;
  }

  public async findAllProjects(): Promise<Projects[]> {
    const { projects } = this;

    return projects;
  }

  public async create({
    name,
    start_date,
    end_date,
  }: ICreateProjectDTO): Promise<Projects> {
    const project = new Projects();

    Object.assign(project, { id: uuid(), name, start_date, end_date });

    this.projects.push(project);

    return project;
  }
}

export default FakeProjectsRepository;
