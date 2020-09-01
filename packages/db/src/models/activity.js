import Activity from '../dbmodels/activity';

class ActivityModel {
  static async createActivity(body) {
    try{
      const activity = await Activity.create(body);
      return activity;
    } catch (err) {
      console.error('Error creating activity', err);
    }
  }
}

export default ActivityModel;