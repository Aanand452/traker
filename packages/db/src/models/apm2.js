import db from '../dbmodels/';
import { v4 as uuidv4 } from 'uuid';

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

  static async addNew(body) {
    try{
      body.apm2Id = uuidv4();
      if(!body.apm2Id) throw new Error("It was imposible to create a apm2 due to an id error");

      const apm2 = await db.APM2.create(body);
      
      return apm2;
    } catch (err) {
      console.error('Error creating apm2', err);
      return 'error';
    }
  }
}

export default APM2;