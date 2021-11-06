import AppError from 'shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import Activities from '../infra/typeorm/entities/Activities';
import IActivitiesRepository from '../repositories/IActivitiesRepository';

interface IRequest {
  id: string;
}

@injectable()
class ListActivitieService {
  constructor(
    @inject('ActivitiesRepository')
    private activitiesRepository: IActivitiesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Activities> {
    const activitie = await this.activitiesRepository.findById(id);

    if (!activitie) {
      throw new AppError('Activitie not found!');
    }

    return activitie;
  }
}

export default ListActivitieService;
