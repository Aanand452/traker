import db from '../dbmodels/';
import { v4 as uuidv4 } from 'uuid';

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

  static async addNew(body) {
    try{
      body.apm1Id = uuidv4();
      if(!body.apm1Id) throw new Error("It was imposible to create a apm1 due to an id error");

      const apm1 = await db.APM1.create(body);
      
      return apm1;
    } catch (err) {
      console.error('Error creating apm1', err);
      return 'error';
    }
  }
}

export default APM1;