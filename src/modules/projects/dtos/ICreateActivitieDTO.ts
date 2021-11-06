export default interface ICreateActivitieDTO {
  name: string;
  project_id: string;
  finished: boolean;
  start_date: Date;
  end_date: Date;
}
