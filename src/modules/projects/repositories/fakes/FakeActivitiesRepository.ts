import { uuid } from 'uuidv4';
import ICreateActivitieDTO from '@modules/projects/dtos/ICreateActivitieDTO';

import IActivitiesRepository from '../IActivitiesRepository';
import Activities from '../../infra/typeorm/entities/Activities';

class FakeActivitiesRepository implements IActivitiesRepository {
  private activities: Activities[] = [];

  public async findById(id: string): Promise<Activities | undefined> {
    const findActivitie = this.activities.find(
      activitie => activitie.id === id,
    );

    return findActivitie;
  }

  public async findByProject(
    project_id?: string,
  ): Promise<Activities[] | undefined> {
    const findActivitie = this.activities.filter(
      activitie => activitie.project_id === project_id,
    );

    return findActivitie;
  }

  public async findAllActivities(): Promise<Activities[]> {
    const { activities } = this;

    return activities;
  }

  public async create({
    name,
    project_id,
    finished,
    start_date,
    end_date,
  }: ICreateActivitieDTO): Promise<Activities> {
    const activitie = new Activities();

    Object.assign(activitie, {
      id: uuid(),
      name,
      project_id,
      finished,
      start_date,
      end_date,
    });

    this.activities.push(activitie);

    return activitie;
  }
}

export default FakeActivitiesRepository;
