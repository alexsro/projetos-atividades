import { getRepository, Repository } from 'typeorm';

import ICreateActivitieDTO from '@modules/projects/dtos/ICreateActivitieDTO';
import IActivitiesRepository from '@modules/projects/repositories/IActivitiesRepository';
import Activities from '../entities/Activities';

class ProjectsRepository implements IActivitiesRepository {
  private ormRepository: Repository<Activities>;

  constructor() {
    this.ormRepository = getRepository(Activities);
  }

  public async findAllActivities(): Promise<Activities[]> {
    const activities = await this.ormRepository.find();
    return activities;
  }

  public async findByProject(project_id?: string): Promise<Activities[]> {
    const findActivitie = await this.ormRepository.find({
      where: { project_id },
    });

    return findActivitie || null;
  }

  public async findById(id: string): Promise<Activities | undefined> {
    const findActivitie = await this.ormRepository.findOne({
      where: { id },
    });

    return findActivitie || null;
  }

  public async create(activitieData: ICreateActivitieDTO): Promise<Activities> {
    const activitie = this.ormRepository.create(activitieData);

    await this.ormRepository.save(activitie);

    return activitie;
  }
}

export default ProjectsRepository;
