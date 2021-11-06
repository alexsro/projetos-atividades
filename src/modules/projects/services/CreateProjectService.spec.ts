import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository';
import CreateProjectService from './CreateProjectService';

let fakeProjectsRepository: FakeProjectsRepository;
let creteProject: CreateProjectService;

describe('Criar projeto', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository();
    creteProject = new CreateProjectService(fakeProjectsRepository);
  });

  it('deve criar um novo projeto', async () => {
    const project = await creteProject.execute({
      name: 'Project 123',
      start_date: new Date(2020, 4, 10),
      end_date: new Date(2020, 4, 15),
    });

    expect(project).toHaveProperty('id');
  });
});
