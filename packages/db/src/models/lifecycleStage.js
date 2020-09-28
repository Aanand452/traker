import db from '../dbmodels/';

class LifecycleStage {
  static async getAll() {
    try{
      const lifecycleStages = await db.LifecycleStage.findAll();

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
        console.error('Error getting activity', err);
        reject(err);
      }
    });
  }
}

export default LifecycleStage;