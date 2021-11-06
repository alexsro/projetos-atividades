import FakeActivitiesRepository from '../repositories/fakes/FakeActivitiesRepository';
import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository';
import ListActivitiesService from './ListActivitiesService';

let fakeActivitiesRepository: FakeActivitiesRepository;
let fakeProjectsRepository: FakeProjectsRepository;
let listActivities: ListActivitiesService;

describe('Listar atividade por código', () => {
  beforeEach(() => {
    fakeActivitiesRepository = new FakeActivitiesRepository();
    fakeProjectsRepository = new FakeProjectsRepository();
    listActivities = new ListActivitiesService(fakeActivitiesRepository);
  });

  it('deve listar todas as atividades', async () => {
    const project = await fakeProjectsRepository.create({
      name: 'teste',
      start_date: new Date(2020, 4, 10),
      end_date: new Date(2020, 4, 15),
    });

    const creeatedActivitie1 = await fakeActivitiesRepository.create({
      name: '123456',
      project_id: project.id,
      finished: true,
      start_date: new Date(2020, 4, 10),
      end_date: new Date(2020, 4, 15),
    });

    const creeatedActivitie2 = await fakeActivitiesRepository.create({
      name: '123',
      project_id: project.id,
      finished: false,
      start_date: new Date(2020, 4, 10),
      end_date: new Date(2020, 4, 15),
    });

    const activities = await listActivities.execute({
      project_id: 'undefined',
    });

    expect(activities).toEqual([creeatedActivitie1, creeatedActivitie2]);
  });

  it('deve listar todas as atividades do projeto informado', async () => {
    const project1 = await fakeProjectsRepository.create({
      name: 'teste',
      start_date: new Date(2020, 4, 10),
      end_date: new Date(2020, 4, 15),
    });

    const project2 = await fakeProjectsRepository.create({
      name: 'teste2',
      start_date: new Date(2020, 4, 10),
      end_date: new Date(2020, 4, 15),
    });

    const creeatedActivitie1 = await fakeActivitiesRepository.create({
      name: '123456',
      project_id: project1.id,
      finished: true,
      start_date: new Date(2020, 4, 10),
      end_date: new Date(2020, 4, 15),
    });

    await fakeActivitiesRepository.create({
      name: '123',
      project_id: project2.id,
      finished: false,
      start_date: new Date(2020, 4, 10),
      end_date: new Date(2020, 4, 15),
    });

    const activitie = await listActivities.execute({
      project_id: project1.id,
    });

    expect(activitie).toEqual([creeatedActivitie1]);
  });
});
