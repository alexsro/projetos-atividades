import Projects from '../infra/typeorm/entities/Projects';
import ICreateProjectDTO from '../dtos/ICreateProjectDTO';

export default interface IProjectsRepository {
  findAllProjects(): Promise<Projects[]>;
  findById(id: string): Promise<Projects | undefined>;
  create(data: ICreateProjectDTO): Promise<Projects>;
}
