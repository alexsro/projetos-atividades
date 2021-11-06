import AppError from 'shared/errors/AppError';
import FakeActivitiesRepository from '../repositories/fakes/FakeActivitiesRepository';
import ListActivitieService from './ListActivitieService';

let fakeActivitiesRepository: FakeActivitiesRepository;
let listActivitie: ListActivitieService;

describe('Listar atividade por código', () => {
  beforeEach(() => {
    fakeActivitiesRepository = new FakeActivitiesRepository();
    listActivitie = new ListActivitieService(fakeActivitiesRepository);
  });

  it('deve retornar erro pois não existe a atividade', async () => {
    await expect(
      listActivitie.execute({
        id: '45345345354',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('deve listar uma atividade a partir do código', async () => {
    const createdActivitie = await fakeActivitiesRepository.create({
      name: 'projeto 123',
      project_id: '1',
      finished: true,
      start_date: new Date(2020, 4, 10),
      end_date: new Date(2020, 4, 15),
    });

    const activitie = await listActivitie.execute({
      id: createdActivitie.id,
    });

    expect(activitie).toEqual(createdActivitie);
  });
});
