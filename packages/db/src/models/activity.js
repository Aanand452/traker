import Activity from '../dbmodels/activity';
import db from '../dbmodels/';
import { v4 as uuidv4 } from 'uuid';

class ActivityModel {
  static async getAllActivitiesByUser(id) {
    try{
      const activities = await db.Activity.findAll({
        include: [db.User, db.Format, db.Region, db.Program]
      });

      const minActivities = activities.map(activity => {
        return ({
          activityId: activity.activityId,
          userId: activity.User ? activity.User.name : '',
          title: activity.title,
          campaignId: activity.campaignId,
          formatId: activity.Format ? activity.Format.name : '',
          abstract: activity.abstract,
          regionId: activity.Region ? activity.Region.name : '',
          startDate: activity.startDate,
          endDate: activity.endDate,
          asset: activity.asset,
          programId: activity.Program ? activity.Program.name : ''
        })
      });
      
      return minActivities;
    } catch (err) {
      console.error('Error getting activity list', err);
    }
  }
  
  static async addNewActivity(body) {
    try{
      body.activityId = uuidv4();
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

  static async deleteActivity(id) {
    try {
      const activity = await db.Activity.findByPk(id);
      await activity.destroy();

      return activity;
    } catch (err) {
      console.error('Error deleting activity', err);
      return 'error';
    }
  }

  static async ETLCheckActivityExists(title, abstract, asset) {
    try {
      const activity = await db.Activity.findAll({
        where: {
          title,
          abstract,
          asset
        }
      });

      if(activity.length) return activity[0];
      else return false;
    } catch (err) {
      console.error('Error getting activity', err);
      return 'error';
    }
  };
};

export default ActivityModel;
