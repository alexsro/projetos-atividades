import AppError from 'shared/errors/AppError';
import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository';
import FakeActivitiesRepository from '../repositories/fakes/FakeActivitiesRepository';
import CreateActivitieService from './CreateActivitieService';

let fakeProjectsRepository: FakeProjectsRepository;
let fakeActivitiesRepository: FakeActivitiesRepository;
let creteActivitie: CreateActivitieService;

describe('Criar atividade', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository();
    fakeActivitiesRepository = new FakeActivitiesRepository();
    creteActivitie = new CreateActivitieService(
      fakeActivitiesRepository,
      fakeProjectsRepository,
    );
  });

  it('Deve retornar erro pelo projeto não existir', async () => {
    await expect(
      creteActivitie.execute({
        name: 'atividade 123',
        project_id: '1',
        finished: true,
        start_date: new Date(2020, 4, 10),
        end_date: new Date(2020, 4, 15),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Deve criar uma nova atividade', async () => {
    const project = await fakeProjectsRepository.create({
      name: 'teste',
      start_date: new Date(2020, 4, 10),
      end_date: new Date(2020, 4, 15),
    });

    const activitie = await creteActivitie.execute({
      name: 'atividade 123',
      project_id: project.id,
      finished: true,
      start_date: new Date(2020, 4, 10),
      end_date: new Date(2020, 4, 15),
    });

    expect(activitie).toHaveProperty('id');
  });
});
