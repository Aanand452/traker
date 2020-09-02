import Activity from '../dbmodels/activity';

class ActivityModel {
  static async addNewActivity(body) {
    try{
      const activity = await Activity.create(body);
      return activity;
    } catch (err) {
      console.error('Error creating activity', err);
    }
  }

  static async updateActivity(body) {
    try{
      const activity = await Activity.create(body);
      return activity;
    } catch (err) {
      console.error('Error creating activity', err);
    }
  }
}

export default ActivityModel;