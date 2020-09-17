import db from '../dbmodels/';

class Industry {
  static async getAll() {
    try{
      const industries = await db.Industry.findAll();

      return industries;
    } catch (err) {
      console.error('Error getting industries', err);
      return 'error';
    }
  }
}

export default Industry;