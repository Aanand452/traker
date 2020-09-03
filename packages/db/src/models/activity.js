import Activity from '../dbmodels/activity';
import db from '../dbmodels/';
import uuid from 'uuid';

class ActivityModel {
  static async addNewActivity(body) {
    try{
      body.activityId = uuid.v4();
      const activity = await Activity.create(body);
      return activity;
    } catch (err) {
      console.error('Error creating activity', err);
      return 'error';
    }
  }

  static async updateActivity(id, body) {
    try{
      await db.Activity.update(body, {
        where: {
          activity_id: id
        }
      });

      return await db.Activity.findByPk(id);
    } catch (err) {
      console.error('Error updating an activity', err);
      return 'error';
    }
  }

  static async getActivityById(id) {
    try{
      const activity = await db.Activity.findByPk(id);

      return activity;
    } catch (err) {
      console.error('Error getting activity', err);
      return 'error';
    }
  }
}

export default ActivityModel;