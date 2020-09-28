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

  static async getByName(name) {
    return new Promise(async (resolve, reject) => {
      try{
        const response = await db.APM1.findAll({
          where: {
            name: name
          }
        });
  
        let data = response.length > 0 ? response[0].dataValues.apm1Id : null;
        resolve(data);
      } catch (err) {
        console.error('Error getting activity', err);
        reject(err);
      }
    });
  }
}

export default APM1;