import { inject, injectable } from 'tsyringe';

import IActivitiesRepository from '../repositories/IActivitiesRepository';
import IProjectsRepository from '../repositories/IProjectsRepository';

interface IProjectsWithStats {
  id: string;
  name: string;
  start_date: Date;
  end_date: Date;
  percentage_completed: number;
  expired: boolean;
}

@injectable()
class ListProjectsWithStatsService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
    @inject('ActivitiesRepository')
    private activitiesRepository: IActivitiesRepository,
  ) {}

  public async execute(): Promise<IProjectsWithStats[]> {
    const projects = await this.projectsRepository.findAllProjects();
    const projectsWithStats = Array<IProjectsWithStats>();

    await Promise.all(
      projects.map(async project => {
        const activities = await this.activitiesRepository.findByProject(
          project.id,
        );

        const totalActivities = activities.length;
        const totalFinishedActivities = activities.filter(p => {
          return p.finished === true;
        });

        const activitiesFishedAfterProject = activities.filter(p => {
          return p.end_date > project.end_date;
        });
        const expired = activitiesFishedAfterProject.length > 0;

        const percentage_completed =
          totalFinishedActivities.length > 0
            ? (totalFinishedActivities.length / totalActivities) * 100
            : 0;

        projectsWithStats.push({
          id: project.id,
          name: project.name,
          start_date: project.start_date,
          end_date: project.end_date,
          percentage_completed,
          expired,
        });
      }),
    );

    return projectsWithStats;
  }
}

export default ListProjectsWithStatsService;
