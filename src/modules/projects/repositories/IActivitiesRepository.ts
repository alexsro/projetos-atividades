import Activities from '../infra/typeorm/entities/Activities';
import ICreateActivitieDTO from '../dtos/ICreateActivitieDTO';

export default interface IActivitiesRepository {
  findAllActivities(): Promise<Activities[]>;
  findByProject(project_id?: string): Promise<Activities[]>;
  findById(id: string): Promise<Activities | undefined>;
  create(data: ICreateActivitieDTO): Promise<Activities>;
}
