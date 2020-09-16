import db from '../dbmodels/';

class APM1 {
  static async getAll() {
    try{
      const apms = await db.APM1.findAll();

      return apms;
    } catch (err) {
      console.error('Error getting apm1s', err);
      return 'error';
    }
  }
}

export default APM1;