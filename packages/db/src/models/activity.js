import Activity from '../dbmodels/activity';
import ActivityLog from '../dbmodels/activityLog';
import db from '../dbmodels/';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { Op } from 'sequelize';

class ActivityModel {
  static async getAllActivitiesByUser(id, date) {
    try{
      const activities = await db.Activity.findAll({
        include: [db.User, db.Format, db.Region, db.Program],
        where: {
          startDate : {[Op.gte]: date ? moment(date, 'DD/MM/YYYY') : moment().subtract(90, 'days')}
        },
        order: [
          ['title', 'ASC'],
        ]
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
          customerMarketing: activity.customerMarketing,
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
          abstract
        }
      });

      if(activity.length) return activity[0];
      else return false;
    } catch (err) {
      console.error('Error getting activity', err);
      return 'error';
    }
  };

  static async logChanges(id, user, previous, activity, method) {
    try {
      const keys = ['userId', 'title', 'campaignId', 'formatId', 'abstract', 'regionId', 'startDate', 'endDate', 'asset', 'programId', 'customerMarketing'];
      const activityLogId = uuidv4();
      let changes = [];

      keys.forEach(key => {
        if(key === 'startDate' || key === 'endDate'){
          if(!activity[key] || !previous[key] || moment(activity[key]).format('DD/MM/YYYY') !== moment(previous[key]).format('DD/MM/YYYY')) {
            changes.push({
              field: key,
              from: previous[key],
              to: activity[key]
            })
          }
        } else {
          if(activity[key] !== previous[key]) {
            changes.push({
              field: key,
              from: previous[key],
              to: activity[key]
            })
          }
        }
      });

      const body = {
        activityLogId,
        activityId: id,
        userId: user,
        change: JSON.stringify(changes),
        changeDate: Date.now(),
        method
      };

      const log = await ActivityLog.create(body);
      return log;
    } catch (err) {
      console.error('Error creating activity Log', err);
      return 'error';
    }
  };
};

export default ActivityModel;
