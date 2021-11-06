import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository';
import ListProjectsService from './ListProjectsService';

let fakeProjectsRepository: FakeProjectsRepository;
let listProjects: ListProjectsService;

describe('Listar projeto por código', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository();
    listProjects = new ListProjectsService(fakeProjectsRepository);
  });

  it('deve listar todos os projetos', async () => {
    const creeatedProject1 = await fakeProjectsRepository.create({
      name: '123456',
      start_date: new Date(2020, 4, 10),
      end_date: new Date(2020, 4, 15),
    });

    const creeatedProject2 = await fakeProjectsRepository.create({
      name: '123',
      start_date: new Date(2020, 4, 10),
      end_date: new Date(2020, 4, 15),
    });

    const projects = await listProjects.execute();

    expect(projects).toEqual([creeatedProject1, creeatedProject2]);
  });
});
