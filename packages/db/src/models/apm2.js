import db from '../dbmodels/';

class APM2 {
  static async getAll() {
    try{
      const apms = await db.APM2.findAll({
        order: [
          ['name', 'ASC'],
        ]
      });

      return apms;
    } catch (err) {
      console.error('Error getting apm2s', err);
      return 'error';
    }
  }

  static async getByName(name) {
    return new Promise(async (resolve, reject) => {
      try{
        const response = await db.APM2.findAll({
          where: {
            name: name
          }
        });
  
        let data = response.length > 0 ? response[0].dataValues.apm2Id : null;
        resolve(data);
      } catch (err) {
        console.error('Error getting activity', err);
        reject(err);
      }
    });
  }
}

export default APM2;