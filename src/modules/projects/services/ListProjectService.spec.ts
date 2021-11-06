import AppError from 'shared/errors/AppError';
import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository';
import ListProjectService from './ListProjectService';

let fakeProjectsRepository: FakeProjectsRepository;
let listProject: ListProjectService;

describe('Listar projeto por código', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository();
    listProject = new ListProjectService(fakeProjectsRepository);
  });

  it('deve retornar erro pois não existe o projeto', async () => {
    await expect(
      listProject.execute({
        id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('deve listar um projeto a partir do código', async () => {
    const createdProject = await fakeProjectsRepository.create({
      name: 'projeto 123',
      start_date: new Date(2020, 4, 10),
      end_date: new Date(2020, 4, 15),
    });

    const project = await listProject.execute({
      id: createdProject.id,
    });

    expect(project).toEqual(createdProject);
  });
});
