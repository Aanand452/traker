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
}

export default LifecycleStage;