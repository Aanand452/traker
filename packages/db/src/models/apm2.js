import db from '../dbmodels/';

class APM2 {
  static async getAll() {
    try{
      const apms = await db.APM2.findAll();

      return apms;
    } catch (err) {
      console.error('Error getting apm2s', err);
      return 'error';
    }
  }
}

export default APM2;