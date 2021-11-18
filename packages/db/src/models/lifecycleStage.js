import db from '../dbmodels/';
import { v4 as uuidv4 } from 'uuid';

class LifecycleStage {
  static async getAll() {
    try{
      const lifecycleStages = await db.LifecycleStage.findAll({
        order: [
          ['name', 'ASC'],
        ]
      });

      return lifecycleStages;
    } catch (err) {
      console.error('Error getting lifecycle stages', err);
      return 'error';
    }
  }
  
  static async getByName(name) {
    return new Promise(async (resolve, reject) => {
      try{
        const response = await db.LifecycleStage.findAll({
          where: {
            name: name
          }
        });
  
        let data = response.length > 0 ? response[0].dataValues.lifecycleStageId : null;
        resolve(data);
      } catch (err) {
        console.error('Error getting lifecycleStage', err);
        reject(err);
      }
    });
  }

  static async addNew(body) {
    try{
      body.lifecycleStageId = uuidv4();
      if(!body.lifecycleStageId) throw new Error("It was imposible to create a lifecycleStage due to an id error");

      const lifecycleStage = await db.LifecycleStage.create(body);
      
      return lifecycleStage;
    } catch (err) {
      console.error('Error creating lifecycleStage', err);
      return 'error';
    }
  }
}

export default LifecycleStage;