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

  static async getActivityById(id) {
    try{
      console.log('activity')
      const activity = await Activity.findByPk(id);
      console.log(activity)
      return activity;
    } catch (err) {
      console.error('Error getting activity', err);
      return 'error';
    }
  }
}

export default ActivityModel;